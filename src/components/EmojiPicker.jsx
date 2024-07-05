import React, { useState } from 'react'
import Picker from 'emoji-picker-react';
import { FaRegSmile } from "react-icons/fa";

function EmojiPicker({val, func}) {
  const [showPicker, setShowPicker] = useState(false);
 
  const pickEmoji = (emojiObject, event) => {
    console.log(emojiObject.emoji);
    func(prevInput => prevInput + emojiObject.emoji);
    // setInputStr(prevInput => prevInput + emojiObject.emoji);
    // setShowPicker(false);
  };
  return (
      <>
        <FaRegSmile onClick={() => setShowPicker(val => !val)} size={20} />
      {/* <img
        className="cursor-pointer absolute"
        src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
        onClick={() => setShowPicker(val => !val)} /> */}
    <div className='absolute bottom-[50px] '>
        {showPicker && <Picker className='absolute' pickerStyle={{ width: '100%', backgroundColor:"red", position:"absolute", bottom:0}} onEmojiClick={pickEmoji} />}
    </div>
    </>
  )
}

export default EmojiPicker