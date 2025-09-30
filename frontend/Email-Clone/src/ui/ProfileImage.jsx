import React from 'react'

const ProfileImage = ({name}) => {
  return (
    <div className='rounded-full bg-blue-500 p-3 w-10 h-10 flex justify-center items-center text-white text-lg'>
        {name?.substring(0, 1)}
    </div>
  )
}

export default ProfileImage