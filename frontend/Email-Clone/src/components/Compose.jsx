import React, { useEffect, useState } from 'react'

import { IoSendSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";

const Compose = () => {
    const [receiver, setReceiver] = useState();

    const user = JSON.parse(localStorage.getItem("user"));

    const sender = user.email;
    const [subject, setSubject] = useState();
    const [body, setBody] = useState();

    const navigate = useNavigate();

    const [userEmails, setUserEmails] = useState([]);
    const [mailType, setMailType] = useState("Normal");

    console.log(userEmails);

    useEffect(() => {
      const fetchUsers = async () => {
        try{
          const response = await fetch("http://localhost:3000/usermails", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              data: "shambu@gmail.com"
            })
          })
          const data = await response.json();
          if(data.success){
            console.log(data);
            setUserEmails(data.data);
          }
          else{
            console.log(data.message);
          }
        }
        catch(err){
          console.log(err);
        }

      }
      fetchUsers();
    }, []);

    const handleSubmitButton = (e) => {
      e.preventDefault();
      console.log(sender, receiver, subject, body, mailType);
      const sendData = async () => {
        const response = await fetch("http://localhost:3000/addemail", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({sender: sender, receiver: receiver, subject: subject, body: body, mailType: mailType})
        })

        const data = await response.json();
        if(data.success){
          alert("EMAIL SENT SUCESSFULLY");
          setReceiver("");
          setSubject("");
          setBody("");
          setMailType("");
        }
        else{
          alert("ERROR IN SENDING THE MAIL");
        }
      }
      sendData();
    }
  return (
    <div className=' w-[70%] mx-auto mt-8'>
      <div onClick={() => {navigate(-1)}} className='inline-flex rounded-md items-center gap-1 p-2 bg-red-400'><IoArrowBackCircle /> Back to Home</div>
      <form onSubmit={handleSubmitButton} className='flex gap-2 flex-col p-4 bg-gray-200 shadow-2xl'>
          <h1 className='text-center text-3xl font-bold text-gray-700 mb-6'>SEND MAIL</h1>
          {/* <input onChange={(e) => {setReceiver(e.target.value)}} value={receiver} className='p-2 border rounded-md' type='text' placeholder='Receiver Mail' /> */}

          <select required onChange={(e) => setReceiver(e.target.value)} value={receiver}
            className="p-2 border rounded-md"
          >
            <option value="">Select Receiver</option>
            {userEmails.map((user, index) => (
              <option key={index} value={user.email}>
                {user}
              </option>
            ))}
          </select>
          <input required onChange={(e) => {setSubject(e.target.value)}} value={subject} className='p-2 border rounded-md' type='text' placeholder='Subject' />

          <select
            required
            onChange={(e) => setMailType(e.target.value)}
            value={mailType}
            className="p-2 border rounded-md"
          >
            <option value="">Select Mail Type</option>
            <option value="Important">Important</option>
            <option value="Marketing">Marketing</option>
            <option value="Personal">Personal</option>
            <option value="Spam">Spam</option>
          </select>

          <textarea required onChange={(e) => {setBody(e.target.value)}} value={body} className='p-2 border rounded-md' rows={15} placeholder='Mail Body' />
          <button type='submit' className='flex items-center gap-2 bg-green-500 p-2 justify-center rounded-md'>Send <IoSendSharp /> </button>
      </form>
    </div>
  )
}

export default Compose

/*

const inbox_table = `CREATE TABLE INBOX (
    mailId INT AUTO_INCREMENT PRIMARY KEY,
    sender TEXT NOT NULL,
    receiver TEXT NOT NULL,
    subject TEXT,
    body TEXT,
    mailType ENUM('Important', 'Spam', 'Market', 'Personal') NOT NULL
  )`;


  */