import React, { useState } from 'react'
import Avatar from 'react-avatar';
import { AiOutlinePicture } from "react-icons/ai";
import { POST } from '../utils/endPoints';
import axios from 'axios';
import toast from 'react-hot-toast';
import useGetFeed from '../hooks/useGetFeed';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedRefresh } from '../redux/userSlice';
import EmojiPicker from './EmojiPicker';

function CreatePost({id}) {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user.userInfo);
    const [variable, setVariable] = useState(id);
    const [content, setContent] = useState("");
    async function createHandler(){
        try{
            const res = await axios.post(`${POST}/create`, {content});
            if(res.data.success){
                toast.success("Post Created");
            }
            setContent("");
            dispatch(getFeedRefresh());
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    }

    useGetFeed(variable);
    function followingHandler(){
        setVariable("following");
    }
    function homeHandler(){
        setVariable(id);
    }
  return (
    <div className='mt-4 h-auto'>
        <div className='flex items-center justify-between text-lg border-b-2 border-gray-200 text-gray-500 font-semibold'>
            <div className='w-1/2 flex items-center justify-center'>
                {variable == id && <h1 onClick={homeHandler} className='py-2 px-4 border-b-4 cursor-pointer border-b-gray-300 hover:border-b-black'>For you</h1>}
                {variable != id && <h1 onClick={homeHandler} className='py-2 px-4 border-b-4 border-b-white cursor-pointer hover:border-b-black'>For you</h1>}
            </div>
            <div className='w-1/2 flex items-center justify-center'>
                {variable == "following" && <h1 onClick={followingHandler} className='py-2 px-4 border-b-4 cursor-pointer border-b-gray-300 hover:border-b-black'>Following</h1>}
                {variable != "following" && <h1 onClick={followingHandler} className='py-2 px-4 border-b-4 border-b-white cursor-pointer hover:border-b-black'>Following</h1>}
            </div>
        </div>
        <div className='border-b-2 border-gray-200 py-3 h-auto'>
            <div className='flex gap-3 p-3'>
                <div>
                {
                (user?.profilePic == "http://localhost:4000/") ? <Avatar src="https://userpic.codeforces.org/3580610/title/e873b0e029da8dda.jpg" size="40" round={true} /> : <Avatar src={user?.profilePic} size="40" round={true} />
                }
                </div>
                <textarea rows={2} value={content} onChange={(e)=> setContent(e.target.value)} className="text-lg w-full outline-none border-none" type="text" placeholder='What is happening?!'/>
            </div>
            <div className='flex justify-between px-3 items-center'>
                <div className='text-xl'>
                    <EmojiPicker func={setContent} val={content}/>
                </div>
                <button onClick={createHandler} className='bg-blue-400 py-2 px-6 font-semibold text-lg border-none text-white rounded-full '>
                    Post
                </button>
            </div>
        </div>
    </div>
  )
}

export default CreatePost