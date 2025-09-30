import React from 'react'

import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const em = [
    {
        "id": 1,
      "SenderName": "Shambu",
      "MailInformation": {
        "Subject": "Request for Referral – Shambu for SDE at Mountblue Technologies",
        "Body": "Hi Shambu,\n\nI hope you’re doing well! I noticed that Mountblue Technologies is hiring for a SDE position, and I am very interested in applying. Given your experience with the company, I was wondering if you would be willing to refer me for this role.\n\nA little about me: I have 4 years of experience in JS, Java, React, and I’ve worked on briefly mention a relevant project or achievement. I believe my background aligns well with the responsibilities of the SDE position.\n\nI’ve attached my resume for your reference. Please let me know if you need any additional information from me. I truly appreciate your time and support!\n\nThank you so much,"
      },
      "MailType": "Important"
    }
]

const MailDetails = ({mail, setDisplayMailData}) => {
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
    const handleBackButton = () => {
        useNavigate()
    }
    const navigate = useNavigate();
    // const mail = em[0];
  return (
    <div className="fixed top-0 right-0 w-1/2 min-h-screen bg-white shadow-2xl z-50 p-4 rounded-l-lg">
        <div onClick={() => {setDisplayMailData(null)}} className='flex gap-2 items-center p-2 text-red-400'><IoArrowBackCircle /> <span>Back</span> </div>
        <div className=''>
            <div className='flex justify-between'>
                <div>{mail.sender}</div>
                <div className={`${colorMailType(mail.mailType)}`}>{mail.mailType}</div>
            </div>
            <div>
                <div className='font-semibold'>{mail.sender}</div>
                <div className='whitespace-pre-line'>{mail.body}</div>
            </div>
        </div>
    </div>
  )
}

export default MailDetails
