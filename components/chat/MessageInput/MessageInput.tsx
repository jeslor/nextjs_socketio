"use client";
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useRef, useState } from 'react'

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const textareaRef = useRef<any>(null);
    const fileInputRef = useRef<any>(null);

    useEffect(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = "20px"; 
          textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + "px"; 
        }
      }
      , [message]);


    const handleInput = (e:any) => {
        setMessage(e.target.value);
        if (textareaRef.current) {
        textareaRef.current.style.height = "20px"; 
        textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + "px"; 
        }
      };

    const handleFileInput = () => {
        fileInputRef.current.click();
      };


  return (
    <div className=' flex items-center justify-between bg-base-200 p-4 w-full'>
    <form className='flex w-full' action="">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInput}
          placeholder="Type a message..."
          className="flex-1 resize-none min-h-[20px] max-h-[150px] overflow-hidden p-2 rounded-[40px] px-5 bg-gray-700  outline-none"
        ></textarea>
        <input ref={fileInputRef} type="file" className="hidden" />
        <button className=" text-[22px] px-4 py-2 rounded-lg  opacity-50 hover:opacity-100" type="submit">
        <Icon icon="fa:send-o"   />
        </button>
    </form>
    <button onClick={handleFileInput} className='opacity-50 hover:opacity-100'>
        <Icon icon="humbleicons:image" width="24" height="24"  />
    </button>

    </div>
  )
}

export default MessageInput