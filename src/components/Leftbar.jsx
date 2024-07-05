import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { AUTH } from '../utils/endPoints';
import axios from 'axios';


const Leftbar = React.memo(() => {
    const navigate = useNavigate();
    async function logoutHandler(){
        await axios.get(`${AUTH}/logout`);
        navigate("/login");
    }
  return (
    <div className='w-[20%] h-screen px-4'>
        <div>
            <div className='flex mt-4 text-xl items-center py-2 px-4'>
                <img width={"40px"} src="https://img.freepik.com/premium-vector/vector-twitter-logo-design_832240-195.jpg?w=740" alt="logo" />
            </div>
            <Link to="/" className='flex mt-2 text-xl items-center py-2 px-4 hover:bg-gray-200 rounded-md hover:cursor-pointer'>
                <div>
                    <IoHomeOutline />
                </div>
                <h1 className='ml-2'>Home</h1>
            </Link>
            <Link to={`/message`} className='flex mt-2 text-xl items-center py-2 px-4 hover:bg-gray-200 rounded-md hover:cursor-pointer'>
                <div>
                    <MdOutlineEmail size={22} />
                </div>
                <h1 className='ml-2'>Messages</h1>
            </Link>
            <Link to={`/bookmark`} className='flex mt-2 text-xl items-center py-2 px-4 hover:bg-gray-200 rounded-md hover:cursor-pointer'>
                <div>
                    <FaRegBookmark />
                </div>
                <h1 className='ml-2'>Bookmark</h1>
            </Link>
            <Link to={`/profile/user`} className='flex mt-2 text-xl items-center py-2 px-4 hover:bg-gray-200 rounded-md hover:cursor-pointer'>
                <div>
                    <CgProfile />
                </div>
                <h1 className='ml-2'>Profile</h1>
            </Link>
            <div onClick={logoutHandler} className='flex mt-2 text-xl items-center py-2 px-4 hover:bg-gray-200 rounded-md hover:cursor-pointer'>
                <div>
                    <FiLogOut />
                </div>
                <h1 className='ml-2'>Logout</h1>
            </div>
        </div>
    </div>
  )
});

export default Leftbar