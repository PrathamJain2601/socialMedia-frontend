import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoArrowBackOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import Tweet from './Tweet';
import Avatar from 'react-avatar';
import useGetUserProfile from '../hooks/useGetUserProfile';
import useGetProfile from '../hooks/useGetProfile';
import { useSelector, useDispatch } from 'react-redux';
import Feed from './Feed';
import FollowButton from './FollowButton';
import EditProfileButton from './EditProfileButton';
import EditProfilePopup from './EditProfilePopup';
import FollowerPopup from './FollowerPopup';

const Profile = () => {
  const [editProfiler, setEditProfiler] = useState([false, "no"]);
  const [followerPopup, setFollowerPopup] = useState([false, [], "no"]);
  const { id } = useParams();
  
  useGetProfile(id);
  const res = useSelector(store => store.user.profile);
  const res2 = useSelector(store => store.user.posts);

  return (
    <div>
      {editProfiler[0] && <EditProfilePopup button={setEditProfiler} detail={res} />}
      {followerPopup[0] && <FollowerPopup button={setFollowerPopup} list={followerPopup[1]} title={followerPopup[2]}/>}
      <div className='flex items-center m-2 p-1'>
        <Link to="/" className='p-3 hover:bg-gray-200 rounded-full cursor-pointer'>
          <IoArrowBackOutline />
        </Link>
        <div className='ml-2'>
          <h1 className='font-semibold'>{res?.name}</h1>
          <h1 className='text-gray-500'>{res2?.length} Posts</h1>
        </div>
      </div>
      <div className='w-full max-h-[250px] overflow-hidden'>
        {
          (res?.profileBanner == "http://localhost:4000/") ? <img className='w-full max-h-[250px]' src="https://png.pngtree.com/background/20210710/original/pngtree-grassland-landscape-green-fresh-banner-picture-image_992136.jpg" alt="" /> : <img className='w-full max-h-[250px]' src={res?.profileBanner} alt="" />
        }
        {/* <img className='w-full max-h-[250px]' src={res?.profileBanner || "https://png.pngtree.com/background/20210710/original/pngtree-grassland-landscape-green-fresh-banner-picture-image_992136.jpg"} alt="" /> */}
      </div>
      <div className='flex h-[60px] justify-between items-center px-4'>
        <div className='relative z-10 -top-8 border-4 border-white rounded-full'>
          {
            (res?.profilePic == "http://localhost:4000/") ? <Avatar src="https://userpic.codeforces.org/3580610/title/e873b0e029da8dda.jpg" size="120" round={true} /> : <Avatar src={res?.profilePic} size="120" round={true} />
          }
          {/* <Avatar src={res?.profilePic || "https://userpic.codeforces.org/3580610/title/e873b0e029da8dda.jpg"} size="120" round={true} /> */}
        </div>
        <div>
          {id == "user" && <EditProfileButton button={setEditProfiler} detail={res} />}
          {id != "user" && <FollowButton id={id} />}
        </div>
      </div>
      <div className='px-4 py-2'>
        <h1 className='font-bold text-2xl'>{res?.name}</h1>
        <h1 className='text-gray-500'>@{res?.email.slice(0, res?.email.indexOf("@"))}</h1>
      </div>
      <div className='px-4'>
        <p>{res?.bio}</p>
        {/* <p>Helping homeowners in Western Washington design exceptional outdoor living spaces. Providing landscape design and professional construction since 2005.</p> */}
      </div>
      <div className='flex items-center px-4 py-2 gap-4'>
        <div className='flex items-center'>
          <IoLocationOutline />
          <h1 className='ml-1'>{res?.location}</h1>
        </div>
        <div className='flex items-center'>
          <IoIosLink />
          <h1 className='ml-1'>{res?.links}</h1>
          {/* <h1 className='ml-1'>archterralandscape.com</h1> */}
        </div>
        <div className='flex items-center'>
          <FaRegCalendarAlt />
          <h1 className='ml-1'>{res?.age} years</h1>
        </div>
      </div>
      <div className='flex px-4 gap-3 pb-2'>
        <div className='flex'>
          <h1 className='font-bold'>{res?.following.length}</h1>
          <h1 className='ml-1 cursor-pointer' onClick={()=>{setFollowerPopup([true, res?.following, "Following"])}}>Following</h1>
        </div>
        <div className='flex'>
          <h1 className='font-bold'>{res?.followers.length}</h1>
          <h1 className='ml-1 cursor-pointer' onClick={()=>{setFollowerPopup([true, res?.followers, "Followers"])}}>Followers</h1>
        </div>
      </div>
      <div className='border-t-2 border-gray-200'>
        <Feed id={id} />
      </div>
    </div>
  );
};

export default Profile;
