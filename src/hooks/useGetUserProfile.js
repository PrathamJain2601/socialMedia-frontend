import axios from "axios"
import { useEffect } from "react"
import { USER } from "../utils/endPoints";
import { useDispatch } from "react-redux";
import { getProfile } from "../redux/userSlice";

const useGetUserProfile = async()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        async function func(){
           try{
                const res = await axios.get(`${USER}/getUserProfile`);
                dispatch(getProfile(res.data.data.profile));
            }
            catch(error){
                console.log(error);
            }
        }
        func();
    }, []);
}

export default useGetUserProfile;