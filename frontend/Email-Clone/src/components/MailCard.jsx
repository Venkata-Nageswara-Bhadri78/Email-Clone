import React from 'react'
import { Link } from 'react-router-dom';

const MailCard = ({classify, mail, setDisplayMailData}) => {
    const colorMailType = (type) => {
        if(type=="Important"){
            return "text-green-500";
        }
        else if(type=="Marketing"){
            return "text-orange-500";
        }
        else{
            return "text-red-500";
        }
    }
    const displayMailData = () => {

    }
  return (
        // <Link to={`/emails/${mail.id}`}>
            <div onClick={() => {setDisplayMailData(mail)}} className='p-3 bg-white shadow-2xl rounded-lg'>
                <div className='flex justify-between'>
                    <div>{mail.sender}</div>
                    {classify && <div className={`${colorMailType(mail.mailType)}`}>{mail.mailType}</div>}
                </div>
                <div>
                    <div className='font-semibold'>{mail.subject}</div>
                    <div>{mail.body.substring(0, 100)}...</div>
                </div>
            </div>
        // </Link>
  )
}

export default MailCard
  

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