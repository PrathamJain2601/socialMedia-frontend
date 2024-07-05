import React from 'react'
import { useSelector } from 'react-redux';
import OtherUsers from './OtherUsers';
import PopupUser from './PopupUser';

function FollowerPopup({button, list, title}) {
    console.log(list);
    let res = useSelector(store=>store.user.otherUsers);
    let myself = useSelector(store=> store.user.userInfo);
    console.log(res);
    res = res.filter((user)=>{
        console.log(user._id);
        if(list.includes(user._id)){
            return true;
        }
        return false;
    })
    if(list.includes(myself._id)){
        res.unshift(myself);
    }
  return (
    <>
    <div className='z-20 absolute top-0 left-0 h-screen w-full bg-gray-500 opacity-20'>   
    </div>
        <div className='rounded-lg absolute z-30 flex justify-center items-center flex-col top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-2/6 bg-white bg-opacity-100 text-center text-xl p-4'>
            <div className='flex w-full justify-between items-center'>
                <p className='ml-2'>{title}</p>
                <p className='cursor-pointer' onClick={()=>{button([false, [], "no"])}}>X</p>
            </div>
            <div className='flex flex-col justify-start items-start w-full'>
                {res?.map((user)=>{
                return(
                // <div key={user._id}>
                    <PopupUser user={user} key={user._id} button={button}/>
                // <div/>
                )
            })}
            </div>
        </div>
    </>
  )
}

export default FollowerPopup