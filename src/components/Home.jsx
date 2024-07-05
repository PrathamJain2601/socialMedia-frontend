import React, { useEffect } from 'react'
import Feed from "./Feed"
import Leftbar from './Leftbar'
import Rightbar from './Rightbar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AUTH } from '../utils/endPoints'
import toast from 'react-hot-toast'
import useGetProfile from '../hooks/useGetProfile'
import useGetUserInfo from '../hooks/useGetUserInfo'


function Home() {
  const navigate = useNavigate();
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
          <div className='w-[55%] border-2 border-gray-200 h-screen overflow-y-scroll'>
            <Outlet />
          </div>
        <Rightbar />
        </div>
    </>
  )
}

export default Home