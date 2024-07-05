import React from 'react'
import Avatar from 'react-avatar'
import { useNavigate } from 'react-router-dom'

function PopupUser({user, button}) {
  const navigate = useNavigate();
  function handler(){
    button([false,  [], "no"]);
    navigate(`/profile/${user._id}`);
  }
  return (
    <div key={user._id} onClick={handler} className='flex items-center border-b-2 border-gray-100 p-4 cursor-pointer'>
        <div>
            <Avatar src="https://userpic.codeforces.org/3580610/title/e873b0e029da8dda.jpg" size="35" round={true} />
        </div>
        <div className='ml-2 text-sm flex'>
            <h1 className='font-semibold'>{user.name}</h1>
            <h1 className='text-gray-500 ml-1'>@{user?.email.slice(0, user?.email.indexOf("@"))}</h1>
        </div>
    </div>
  )
}

export default PopupUser