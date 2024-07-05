import axios from "axios"
import { useEffect } from "react"
import { USER } from "../utils/endPoints";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/userSlice";

const useGetProfile = async(id)=>{  
    const refresh = useSelector(store=>store.user.refresh);
    const dispatch = useDispatch();
    useEffect(()=>{
        async function func(){
           try{
                if(id == "user"){
                    const res = await axios.get(`${USER}/getUserProfile`);
                    console.log(res.data);
                    dispatch(getProfile(res.data.data.profile));
                }
                else{
                    const res = await axios.get(`${USER}/getProfile/${id}`);
                    dispatch(getProfile(res.data.data.profile));
                }
            }
            catch(error){
                console.log(error);
            }
        }
        func();
    }, [id, refresh]);
}

export default useGetProfile;