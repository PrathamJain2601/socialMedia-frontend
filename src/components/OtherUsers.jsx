import React from 'react'
import Avatar from 'react-avatar'
import { useNavigate } from 'react-router-dom'

function OtherUsers({user}) {
  const navigate = useNavigate();
  function handler(){
    navigate(`/profile/${user._id}`);
  }
  return (
    <div key={user._id} onClick={handler} className='flex items-center border-b-2 border-gray-100 p-4 cursor-pointer'>
        <div>
        {
            (user?.profilePic == "http://localhost:4000/") ? <Avatar src="https://userpic.codeforces.org/3580610/title/e873b0e029da8dda.jpg" size="40" round={true} /> : <Avatar src={user?.profilePic} size="40" round={true} />
          }
            {/* <Avatar src="https://userpic.codeforces.org/3580610/title/e873b0e029da8dda.jpg" size="40" round={true} /> */}
        </div>
        <div className='ml-2'>
            <h1 className='font-semibold'>{user.name}</h1>
            <h1 className='text-gray-500'>@{user?.email.slice(0, user?.email.indexOf("@"))}</h1>
        </div>
    </div>
  )
}

export default OtherUsers