import React from 'react'
import BasicSelect from '../ui/BasicSelect'
import { Link } from 'react-router-dom'

const MiniNavbar = ({classify, setClassify, setMailsSize}) => {
  return (
    <div className='flex flex-col'>
      
      <div className='flex items-center justify-between w-[70%] bg-white mx-auto p-3'>
        <div><BasicSelect setMailsSize={setMailsSize} /></div>
        <div onClick={() => {setClassify(!classify)}} className='p-1.5 bg-green-200 rounded-md'>Classify</div>  
      </div>

      <div className='flex items-center justify-between w-[70%] bg-white mx-auto p-3'>
        <Link to={'/compose'}><div className='p-2 bg-gray-300 rounded-sm shadow-md'>COMPOSE</div></Link>
      </div>

    </div>
  )
}

export default MiniNavbar