import React, { useEffect, useState } from 'react'
import MailCard from './MailCard'

const MailInbox = ({classify, setDisplayMailData}) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [inboxmails, setInboxMails] = useState([]);
  useEffect(() => {
    const fetchMails = async () => {
      const response = await fetch("http://localhost:3000/inboxemail", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({mail: user.email})
      })
      const data = await response.json();
      // console.log(data);
      setInboxMails(data.data);
    }
    fetchMails();
  }, []);
  if(inboxmails.length==0){
    return <div>There Is not Data to Display</div>
  }

  console.log(inboxmails);
  return (
    <div className='w-[70%] flex flex-col gap-3 mx-auto py-5'>
        {inboxmails.map(mail => {
            return (
              <div key={mail.mailId}>
                  <MailCard setDisplayMailData={setDisplayMailData} classify={classify} mail={mail} />
              </div>
            )
        })}
    </div>
  )
}

export default MailInbox


const mails = [
    {
        "id": 1,
      "SenderName": "Shambu",
      "MailInformation": {
        "Subject": "Request for Referral – Shambu for SDE at Mountblue Technologies",
        "Body": "Hi Shambu,\n\nI hope you’re doing well! I noticed that Mountblue Technologies is hiring for a SDE position, and I am very interested in applying. Given your experience with the company, I was wondering if you would be willing to refer me for this role.\n\nA little about me: I have 4 years of experience in JS, Java, React, and I’ve worked on briefly mention a relevant project or achievement. I believe my background aligns well with the responsibilities of the SDE position.\n\nI’ve attached my resume for your reference. Please let me know if you need any additional information from me. I truly appreciate your time and support!\n\nThank you so much,"
      },
      "MailType": "Important"
    },
    {
        "id": 2,
      "SenderName": "Ananya",
      "MailInformation": {
        "Subject": "Exclusive Offer on Cloud Hosting Services",
        "Body": "Hello,\n\nWe are excited to announce a limited-time discount on our cloud hosting plans – up to 50% off for the first year! Experience high performance, 24/7 support, and secure infrastructure.\n\nSign up today to unlock this special deal!\n\nBest regards,\nCloudHost Team"
      },
      "MailType": "Marketing"
    },
    {
        "id": 3,
      "SenderName": "Rahul",
      "MailInformation": {
        "Subject": "You Won a Free Gift Card!!!",
        "Body": "Congratulations!\n\nYou have been selected to win a $500 gift card. Click the link below to claim your reward immediately!\n\n[Suspicious Link Here]\n\nHurry, this offer expires soon!"
      },
      "MailType": "Spam"
    }
]
