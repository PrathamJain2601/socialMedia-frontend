import React from 'react'
import { IoSearch } from "react-icons/io5";
import Avatar from 'react-avatar';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from 'react-redux';
import OtherUsers from './OtherUsers';

function Rightbar() {

  useGetOtherUsers();
  const res = useSelector(store=>store.user.otherUsers);

  return (
    <div className='w-[25%]'>
        <div className='pt-4 px-4'>
            <div className='flex items-center p-2 bg-gray-100 rounded-md outline-none text-gray-400'>
              <IoSearch />
              <input type="text" className='ml-1 bg-transparent w-full outline-none' placeholder='Search'/>
            </div>
        </div>
        <div className='pt-4 px-4'>
          <div className='pb-2'>
            <h1 className='text-lg text-center font-semibold text-gray-500'>You might know</h1>
          </div>
          {res?.map((user)=>{
            return(
              // <div key={user._id}>
                <OtherUsers user={user} key={user._id}/>
              // <div/>
            )
          })}
        </div>
    </div>
  )
}

export default Rightbar