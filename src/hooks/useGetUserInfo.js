import axios from "axios"
import { useEffect } from "react"
import { USER } from "../utils/endPoints";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getUserInfo } from "../redux/userSlice";

const useGetUserInfo = async()=>{
    const refresh = useSelector(store=> store.user.refresh);
    const dispatch = useDispatch();
    useEffect(()=>{
        async function func(){
           try{
                const res = await axios.get(`${USER}/getUserProfile`);
                dispatch(getUserInfo(res.data.data.profile));
            }
            catch(error){
                console.log(error);
            }
        }
        func();
    }, [refresh]);
}

export default useGetUserInfo;