import axios from "axios";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { POST } from "../utils/endPoints";
import { getFeedRefresh } from "../redux/userSlice";
import toast from "react-hot-toast";
import DeletePopup from "./DeletePopup";

function Tweet({ post, user, setDeletePop }) {
  const dispatch = useDispatch();

  async function likeHandler(){
    try{
      // console.log(post._id);
      const res = await axios.put(`${POST}/like/${post._id}`);
      // console.log(res);
      dispatch(getFeedRefresh());
    }
    catch(error){
      console.log(error);
    }
  }

  async function bookmarkHandler(){
    try{
      // console.log(post._id);
      const res = await axios.put(`${POST}/bookmark/${post._id}`);
      toast.success(res.data.message);
      dispatch(getFeedRefresh());
    }
    catch(error){
      console.log(error);
    }
  }

  function deleteHandler(){
    console.log(post._id);
    setDeletePop([true, post._id]);
  }

  const givenDate = new Date(post?.createdAt);
  const currentDate = new Date();
  const differenceMs = currentDate - givenDate;

  const seconds = Math.floor(differenceMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);

  return (
    <div className="flex justify-between p-3 border-b-2 border-gray-200">
      <div>
        {
      (post?.userId.profilePic == "http://localhost:4000/") ? <Avatar src="https://userpic.codeforces.org/3580610/title/e873b0e029da8dda.jpg" size="40" round={true} /> : <Avatar src={post?.userId.profilePic} size="40" round={true} />
        }
      </div>
      <div className="w-full">
        <div className="w-full ml-2 py-2 flex items-center">
          <h1 className="font-semibold">
            {post.userId.name}
          </h1>
          <h1 className="ml-1 text-gray-500">
            @
            {post?.userId.email.slice(0, post?.userId.email.indexOf("@"))} . {years?`${years} yrs`:days?`${days} d`: hours?`${hours} h`: minutes?`${minutes} m`: `${seconds} s`}
          </h1>
        </div>
        <div className="ml-2">
          <p>{post.content}</p>
          {/* <p>Hello everyone Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias minus tempora similique placeat deleniti quasi expedita perferendis, accusamus debitis ducimus magnam quam facilis recusandae dicta maiores, ullam provident dolores! Modi?</p> */}
        </div>
        <div className="flex ml-2 py-3 text-lg gap-6">
          <div className="flex items-center">
            <div className="cursor-pointer" onClick={likeHandler}>
              <FaRegHeart />
            </div>
            {/* <p className='ml-1'>0</p> */}
            <p className="ml-1">{post.like.length}</p>
          </div>
          <div className="flex items-center">
            <div className="cursor-pointer">
              <FaRegComment />
            </div>
          </div>
          <div className="flex items-center">
            <div className="cursor-pointer" onClick={bookmarkHandler}>
              {post.bookmark && <FaBookmark className='text-blue-400' />}
              {!post.bookmark && <FaRegBookmark />}
            </div>
          </div>
          <div className="flex items-center">
            <div className="cursor-pointer" onClick={deleteHandler}>
              {post.userId == user?._id && <RiDeleteBin6Line className="text-xl"  />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
