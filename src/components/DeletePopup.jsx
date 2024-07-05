import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { POST } from '../utils/endPoints';
import { getFeedRefresh } from '../redux/userSlice';

function DeletePopup({deleteId, setDeletePop}) {
    const dispatch = useDispatch();
    // console.log(deleteId);
    async function deleteHandler(){
        try{
            // console.log(deleteId);
            const res = await axios.delete(`${POST}/delete/${deleteId}`);
            toast.success(res.data.message);
            dispatch(getFeedRefresh()); 
            setDeletePop([false, "no"]);
          }
          catch(error){
            console.log(error);
          }
    }
    function cancelHandler(){
        setDeletePop([false, "no"]);
    }
    return (
    <>
    <div className='z-20 absolute top-0 left-0 h-screen w-full bg-gray-500 opacity-20'>   
    </div>
        <div className='z-30 absolute flex justify-center items-center flex-col top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2  h-56 w-2/6 bg-white bg-opacity-100 text-center text-xl p-4'>
            Are you sure you want to delete the post?
            <div className='m-3 flex gap-3 justify-center items-center'>
                <button onClick={deleteHandler} className='px-4 py-2 bg-gray-200 hover:bg-red-100'>Delete</button>
                <button onClick={cancelHandler} className='px-4 py-2 bg-gray-200 hover:bg-gray-300'>Cancel</button>
            </div>
        </div>
    </>
  )
}

export default DeletePopup