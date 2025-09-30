import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import MailInbox from "./MailInbox";
import MiniNavbar from "./MiniNavbar";
import MailDetails from './MailDetails';
const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Redirect to login if no user or token
  React.useEffect(() => {
    if (!user || !token) {
      navigate("/");
    }
  }, [user, token, navigate]);

  if (!user) {
    return <h2>Redirecting to login...</h2>;
  }

  const [mailsSize, setMailsSize] = useState(5);
  const [classify, setClassify] = useState(false);
  const [displayMailData, setDisplayMailData] = useState(null);

  return (
    <div className="p-3 bg-gray-200">
        <div className="flex flex-col gap-1.5">
            <Navbar user={user} />
            <MiniNavbar classify={classify} setClassify={setClassify} setMailsSize={setMailsSize} />
        </div>
        <div>
            <MailInbox setDisplayMailData={setDisplayMailData} classify={classify} />
        </div>
        {displayMailData && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>
              <MailDetails setDisplayMailData={setDisplayMailData} mail={displayMailData} />
            </>
        )}
    </div>
  );
};

export default Dashboard;

/*
Sender Name
Mail Information
MailType : Important/Marketing/Spam/Normal

Shambu

Subject: Request for Referral – Shambu for SDE at Mountblue Technologies

Body:
Hi Shambu,

I hope you’re doing well! I noticed that Mountblue Technologies is hiring for a SDE position, and I am very interested in applying. Given your experience with the company, I was wondering if you would be willing to refer me for this role.

A little about me: I have 4 years of experience in JS, Java, React, and I’ve worked on briefly mention a relevant project or achievement. I believe my background aligns well with the responsibilities of the SDE position.

I’ve attached my resume for your reference. Please let me know if you need any additional information from me. I truly appreciate your time and support!

Thank you so much,


jobtype: Important

*/