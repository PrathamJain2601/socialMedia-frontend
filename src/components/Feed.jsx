import React, { useEffect, useState } from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import useGetFeed from '../hooks/useGetFeed'
import { useSelector } from 'react-redux'
import { getPosts } from '../redux/userSlice'
import NoPost from './NoPost'
import DeletePopup from './DeletePopup'

function Feed({id}) {
  const [deletePop, setDeletePop] = useState([false, "no"]);
  useGetFeed(id);
  const userInfo = useSelector(store => store.user.userInfo);
  const posts = useSelector(store => store.user.posts);
  // console.log(userInfo);

  return (
    <>
        <div>
            {id == "home" && <CreatePost id={id} />}
            {posts?.map((post)=>{
              return(
                <Tweet post={post} key={post?._id} user={userInfo} setDeletePop={setDeletePop}/>
              )
            })}
            <div>
              {!posts?.length && <NoPost />}
            </div>
        </div>
        { deletePop[0] && <DeletePopup deleteId={deletePop[1]} setDeletePop={setDeletePop} /> }
    </>
  )
}

export default Feed