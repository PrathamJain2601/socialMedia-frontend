import axios from "axios"
import { useEffect } from "react"
import { POST, USER } from "../utils/endPoints";
import { useDispatch, useSelector } from "react-redux";
import { getOtherUsers, getPosts } from "../redux/userSlice";

const useGetFeed = (id)=>{
    const feedRefresh = useSelector(store => store.user.feedRefresh);
    const dispatch = useDispatch();
    useEffect(()=>{
        async function func(){
           try{
                console.log(id);
                if(id == "following"){
                    const res = await axios.get(`${POST}/getRelevantPosts`);
                    dispatch(getPosts(res.data.data));
                }
                else if(id == "bookmarked"){
                    const res = await axios.get(`${POST}/getAllPosts/home`);
                    const result = res.data.data.filter((post)=> post.bookmark);
                    dispatch(getPosts(result));
                }
                else{
                    // console.log(id);
                    const res = await axios.get(`${POST}/getAllPosts/${id}`);
                    // console.log(res.data.data);
                    dispatch(getPosts(res.data.data));
                }
            }
            catch(error){
                console.log(error);
            }
        }
        func();
    }, [id, feedRefresh]);
}

export default useGetFeed;