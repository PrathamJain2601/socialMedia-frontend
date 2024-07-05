import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import Leftbar from './Leftbar'
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from 'react-redux';
import OtherUsers from './OtherUsers';
import Rightbar from './Rightbar';
import MessageUser from './MessageUser';
import Messenger from './Messenger';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useGetUserInfo from '../hooks/useGetUserInfo';
import { AUTH } from '../utils/endPoints';

function Message() {
  useGetOtherUsers();
  const res = useSelector(store=>store.user.otherUsers);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const self = useSelector(store => store.user.userInfo);

  useEffect(()=>{
    console.log("refresh");
    async function func(){
      try{
        const res = await axios.post(`${AUTH}/login`, {}, { withCredentials: true });
        // console.log(res.data.message);
      } 
      catch(error){
        console.log(error.response.data.message);
        navigate("/login");
      } 
    }
    func();
  }, []);

  useGetUserInfo();
  return (
    <>
        <div className='flex justify-between w-[80%] mx-auto'>
        <Leftbar />
        <div className='w-[25%]'>
        <div className='pt-4 px-4'>
          <div className='pb-2'>
            <h1 className='text-lg text-center font-semibold text-gray-500'>Messages</h1>
          </div>
          {res?.map((user)=>{
            return(
                <MessageUser setUser={setUser} user={user} key={user._id}/>
            )
          })}
        </div>
    </div>
        <div className='w-[55%] border-2 border-gray-200 h-screen overflow-y-scroll'>
          {user && <Messenger self={self} user={user}/>}
        </div>
        </div>
    </>
  )
}

export default Message