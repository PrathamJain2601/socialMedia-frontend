import React, { memo, useEffect, useState } from 'react';
import { IoSend } from "react-icons/io5";
import MessageUser from './MessageUser';
import Chat from './Chat';
import io from "socket.io-client";
import OtherUsers from './OtherUsers';
import EmojiPicker from './EmojiPicker';
const socket = io.connect("http://localhost:4000");

export default memo(function Messenger({ user, self }) {
  const [roomId, setRoomId] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server", socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  useEffect(() => {
    if (self && user) {
      socket.emit("joinRoom", { userId1: self._id, userId2: user._id }, (response, oldMessages) => {
        setRoomId(response.roomId);
        setMessages(oldMessages);
        console.log("Joined room with ID:", response.roomId);
      });
    }
  }, [self, user]);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      console.log("New message received:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      console.log("Sending message:", newMessage);
      socket.emit("sendMessage", { roomId: roomId, message: newMessage, sender: self._id }, (newMessage)=>{
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
      setNewMessage("");
    }
  };

  return (
    <div className='flex flex-col justify-between h-screen'>
      <div>
        <OtherUsers user={user} key={user._id}/>
      </div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <Chat msg={msg} self={self._id} />
          </div>
        ))}
      </div>
      <div className='flex justify-around items-center p-4 border-t-2 border-gray-200'>
        <div className='relative'>
          <EmojiPicker func={setNewMessage} val={newMessage} />
        </div>
        <input 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          type="text" 
          placeholder='Whats Happening?!' 
          className='rounded-md w-[85%] py-2 px-4 outline-none border-2 border-gray-500' 
        />
        <div onClick={sendMessage}>
          <IoSend size={24} className='cursor-pointer' />
        </div>
      </div>
    </div>
  );
});
