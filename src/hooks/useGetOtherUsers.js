import axios from "axios"
import { useEffect } from "react"
import { USER } from "../utils/endPoints";
import { useDispatch } from "react-redux";
import { getOtherUsers } from "../redux/userSlice";

const useGetOtherUsers = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        async function func(){
           try{
                const res = await axios.get(`${USER}/getAllUsers`);
                dispatch(getOtherUsers(res.data.data));
            }
            catch(error){
                console.log(error);
            }
        }
        func();
    }, []);
}

export default useGetOtherUsers;