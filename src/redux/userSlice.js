import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"User",
    initialState:{
        profile: null,
        posts:null,
        otherUsers: null,
        userInfo: null,
        refresh: true,
        feedRefresh: true
    },
    reducers:{
        getProfile: (state, action)=>{
            state.profile = action.payload;
        },
        getPosts: (state, action)=>{
            state.posts = action.payload;
        },
        getOtherUsers: (state, action)=>{
            state.otherUsers = action.payload;
        },
        getUserInfo: (state, action)=>{
            state.userInfo = action.payload;
        },
        getRefresh: (state)=>{
            state.refresh = !state.refresh;
        },
        getFeedRefresh: (state)=>{
            state.feedRefresh = !state.feedRefresh;
        }
    }
});

export const {getProfile, getPosts, getOtherUsers, getUserInfo, getRefresh, getFeedRefresh} = userSlice.actions;
export default userSlice.reducer;