import React from 'react'

function EditProfileButton({button, detail}) {
  return (
    <button onClick={()=>{button([true, detail])}} className=' py-2 px-4 rounded-full font-semibold text-md border-2 border-gray-200 hover:bg-gray-100'>Edit Profile</button>
  )
}

export default EditProfileButton