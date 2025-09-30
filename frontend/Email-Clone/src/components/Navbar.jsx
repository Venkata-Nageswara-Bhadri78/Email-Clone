import React, { useState } from 'react'

import { MdLogout } from "react-icons/md";
import ProfileImage from '../ui/ProfileImage';
import { Navigate, useNavigate } from 'react-router-dom';

const Navbar = ({user}) => {

    const navigate = useNavigate(); // ✅ use hook inside component

    const handleLogout = () => {
      /* global google */
      google.accounts.id.disableAutoSelect(); // prevent auto sign-in next time
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/"); // ✅ use the function from useNavigate
    };
  
      
    const [imgError, setImageError] = useState(false);
  return (
    <div className='bg-white rounded-md shadow-2xl p-2 flex mx-auto justify-between w-[70%] items-center'>
        <div className='flex gap-4 items-center'>
            <div>
                {!imgError ? 
                    <img className="w-10 rounded-full" src={user.picture} alt="PP" onError={() => setImageError(true)} />
                    :
                    <ProfileImage name={user.name} />
                }
                
            </div>
            <div>
                <div className='text-blue-500'>{user.name}</div>
                <div className='text-pink-500'>{user.email}</div>
            </div>
        </div>
        <div onClick={handleLogout} className='flex items-center gap-2 bg-red-600 text-white rounded-md p-2'>
            <MdLogout />
            <span>LOGOUT</span>
        </div>
    </div>
  )
}

export default Navbar