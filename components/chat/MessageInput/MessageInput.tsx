"use client";
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useRef, useState } from 'react'

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState<any>(null);
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

      const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result) {
                setFile(reader.result as string);  
            }
        };
    };


  return (
    <div className=' flex items-center justify-between bg-base-200 p-4 w-full relative'>
       {file &&
      <div className='w-[100px] h-[100px] absolute -top-[60px] left-4'>

      <button onClick={() => setFile(null)} className='absolute -top-4 -right-4 bg-primary/20 p-1 rounded-full'>
        <Icon icon="si:close-duotone" />
      </button>
        <img src={file} alt="file" className=' object-cover object-center rounded-[10px]' />
      </div>
      }
    <form className='flex w-full' action="">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInput}
          placeholder="Type a message..."
          className="flex-1 resize-none min-h-[20px] max-h-[150px] overflow-hidden p-2 rounded-[20px] px-5 bg-gray-700  outline-none overflow-y-scroll noScrollBar"
        ></textarea>
        <input onChange={handleFileSelected} ref={fileInputRef} type="file" className="hidden" />
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