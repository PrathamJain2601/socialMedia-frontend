import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { USER } from '../utils/endPoints';
import useGetUserInfo from '../hooks/useGetUserInfo';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/userSlice';

function FollowButton({id}) {
  const dispatch = useDispatch();
  const res = useSelector(store => store.user.userInfo);
  const contain = res?.following.includes(id);
  console.log(contain);
  
  async function follow(){
    try{
      const res = await axios.put(`${USER}/follow/${id}`);
      toast.success(res.data.message);
      dispatch(getRefresh());
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <>
    {contain && <button onClick={follow} className=' py-2 px-4 text-white rounded-full font-semibold text-md border-2 border-gray-200 bg-gray-600 hover:bg-gray-700'>Followed</button>}
    {!contain && <button onClick={follow} className=' py-2 px-4 rounded-full font-semibold text-md border-2 border-gray-200 hover:bg-gray-100'>Follow</button>}
    </>
  )
}

export default FollowButton