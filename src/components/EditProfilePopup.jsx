import React, { useState } from 'react'
import { USER } from '../utils/endPoints';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { getRefresh } from '../redux/userSlice';

function EditProfilePopup({button, detail}) {
    const dispatch = useDispatch();
    const [name, setName] = useState(detail.name);
    const [age, setAge] = useState(detail.age);
    const [location, setLocation] = useState(detail.location);
    const [links, setLinks] = useState(detail.links);
    const [bio, setBio] = useState(detail.bio);
    const [profilePic, setProfilePic] = useState([]);
    const [profileBanner, setProfileBanner] = useState();
    async function saveHandler(e){
      e.preventDefault();
        try{
          const formData = new FormData();
          formData.append("name", name);
          formData.append("age", age);
          formData.append("location", location);
          formData.append("links", links);
          formData.append("bio", bio);
          formData.append("userId", detail._id);
          if (profilePic) formData.append("profilePic", profilePic);
          if (profileBanner) formData.append("profileBanner", profileBanner);

          const res = await axios.put(`${USER}/editProfile`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
            toast.success(res.data.message);
            button([false, "no"]);
            dispatch(getRefresh());
          }
          catch(error){
            console.log(error);
          }
    }
    function cancelHandler(e){
      e.preventDefault();
        button([false, "no"]);
    }
  return (
    <>
    <div className='z-20 absolute top-0 left-0 h-screen w-full bg-gray-500 opacity-20'>   
    </div>
        <div className='absolute z-30 flex justify-center items-center flex-col top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-3/6 bg-white bg-opacity-100 text-center text-xl p-5 rounded-xl'>
            <p className='text-xl'>
              Edit Profile and Save Changes
            </p>
            {/* <form action={USER+"/editProfile"} method='PUT' encType='multipart/form-data' > */}
            <div className='flex gap-3 flex-col my-3 w-full text-base'>
                <div className='flex gap-3 justify-center'>
                <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='name' className='bg-gray-50 border-b-2 border-gray-300 w-1/2 py-1 px-2'/>
                <input type="number" value={age} onChange={(e)=>{setAge(e.target.value)}} placeholder='Age' className='bg-gray-50 border-b-2 border-gray-300 w-1/2 py-1 px-2'/>
                </div>
                <div className='flex gap-3 justify-center'>
                <input type="text" onChange={(e)=>{setLocation(e.target.value)}} value={location} placeholder='location' className='bg-gray-50 border-b-2 border-gray-300 w-1/2 py-1 px-2'/>
                <input type="text" onChange={(e)=>{setLinks(e.target.value)}} value={links} placeholder='links' className='bg-gray-50 border-b-2 border-gray-300 w-1/2 py-1 px-2'/>
                </div>
                <div className='flex gap-3 justify-center'>
                  <div className='w-1/2 text-left'>
                    Profile Picture<br/>
                    <input type="file" onChange={(e)=>{setProfilePic(e.target.files[0])}} name='profilePicture' className='text-sm border-b-2 bg-gray-50 border-gray-300 w-full py-1 px-2'/>
                  </div>
                  <div className='w-1/2 text-left'>
                  Profile Banner <br/>
                  <input type="file" onChange={(e)=>{setProfileBanner(e.target.files[0])}} name='profileBanner' className='text-sm border-b-2 bg-gray-50 border-gray-300 w-full py-1 px-2'/>
                  </div>
                </div>
                <textarea name="" onChange={(e)=>{setBio(e.target.value)}} rows={3} value={bio} placeholder='Bio' className='bg-gray-50 py-1 px-2'></textarea>
            </div>
            <div className='m-3 flex gap-3 justify-center items-center'>
                <button onClick={ saveHandler } className='px-4 py-2 bg-gray-200 hover:bg-blue-100'>Save</button>
                <button onClick={ cancelHandler } className='px-4 py-2 bg-gray-200 hover:bg-gray-300'>Cancel</button>
            </div>
            {/* </form> */}
        </div>
    </>
  )
}

export default EditProfilePopup