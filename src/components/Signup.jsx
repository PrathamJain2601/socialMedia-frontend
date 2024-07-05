import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { AUTH } from '../utils/endPoints';
import toast from 'react-hot-toast';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [location, setLocation] = useState();
  const [age, setAge] = useState();

  useEffect(()=>{
    console.log("refresh");
    async function func(){
      try{
        const res = await axios.post(`${AUTH}/login`, {}, { withCredentials: true });
        console.log(res.data.message);
        toast.success(res.data.message);
        navigate("/");
      } 
      catch(error){
        console.log(error.response.data.message);
      } 
    }
    func();
  }, []);

  async function submitHandler(){
    console.log("hello");
    try{
      const res = await axios.post(`${AUTH}/register`, {email, password, name, location, age}, { withCredentials: true });
      console.log(res.data.message);
      toast.success(res.data.message);
      navigate("/");
    } 
    catch(error){
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    } 
  }

  return (
    <div className='flex items-center w-full h-screen justify-center'>
        <div className='w-1/2 flex items-center justify-center h-full'>
            <img width={"400px"} src="https://img.freepik.com/premium-vector/vector-twitter-logo-design_832240-195.jpg?w=740" alt="logo" />
        </div>
        <div className='w-1/2 h-full flex items-center justify-start'>
            <div>
                <h1 className='text-6xl font-bold py-2'>Happening now</h1>
                <h1 className='text-3xl font-semibold py-2'>Join today</h1>
                <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" className='block text-lg py-2 bg-transparent border-b-2 w-full border-gray-500 outline-none my-2' placeholder='Name'/>
                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" className='block text-lg py-2 bg-transparent border-b-2 w-full border-gray-500 outline-none my-2' placeholder='Email'/>
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" className='block text-lg py-2 bg-transparent w-full border-b-2 border-gray-500 outline-none my-2' placeholder='Password'/>
                <div className='flex gap-3'>
                <input value={location} onChange={(e)=>{setLocation(e.target.value)}} type="text" className='text-lg py-2 bg-transparent border-b-2 w-1/2 border-gray-500 outline-none my-2' placeholder='Location'/>
                <input value={age} onChange={(e)=>{setAge(e.target.value)}} type="number" className='text-lg py-2 bg-transparent border-b-2 w-1/2 border-gray-500 outline-none my-2' placeholder='Age'/>
                </div>
                <input type="submit" onClick={submitHandler} value="Create Account" className='block text-lg font-bold text-white py-3 w-full outline-none bg-blue-500 mt-8 hover:bg-blue-600 cursor-pointer rounded-full' placeholder='Email'/>
                <div className='py-2'>
                <b>Already have an account? </b>
                <Link to="/login" className='text-blue-800 cursor-pointer font-bold'>Try signin</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup