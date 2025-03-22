"use client";
import { useCurrentUserStore } from '@/components/providers/userProvider';
import { useMessageStore } from '@/components/providers/messageProvider';
import { newMessage } from '@/lib/actions/message.actions';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { memo, useEffect, useRef, useState } from 'react'

const MessageInput = memo(() => {
    const {currentUser, selectedUser} = useCurrentUserStore();
    const {subscribeToMessages, setInputTouched, inputTouched} = useMessageStore();
  
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const [text, setText] = useState("");
    const [file, setFile] = useState<any>(null);
    const textareaRef = useRef<any>(null);
    const fileInputRef = useRef<any>(null);

    useEffect(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = "20px"; 
          textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + "px"; 
        }
      }
      , [text]);



      const handleInput = (e: any) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          return submitButtonRef.current?.click();
        }        
        
        if (!inputTouched) {
            setInputTouched(true);
        }
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
        reader.onloadend = () => {
            if (reader.result) {
                setFile(reader.result as string);
            }
        };
    };
    

    const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent) => {
      e.preventDefault();
      if (!text.trim() && !file) return;
  
      subscribeToMessages({
          text,
          file,
          senderId: currentUser._id,
          receiverId: selectedUser._id
      });
  
      setText("");
      setFile(null);
  };
  

  return (
    <div className=' flex items-center justify-between bg-base-200 p-4 w-full relative'>
       {file &&
      <div className='w-[100px] h-[100px]   absolute -top-[100px] left-4'>
      <button onClick={() => setFile(null)} className='absolute -top-4 -right-4 bg-primary/20 p-1 rounded-full'>
        <Icon icon="si:close-duotone" />
      </button>
        <div className='w-full h-full overflow-hidden rounded-[10px]'>
        <img src={file} alt="file" className=' object-cover object-center ' />
        </div>
      </div>
      }
    <form onSubmit={handleMessageSubmit} className='flex w-full' action="">
        <textarea
          ref={textareaRef}
          value={text}
          onKeyUp={handleInput}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 resize-none min-h-[20px] max-h-[150px] overflow-hidden p-2 rounded-[20px] px-5 bg-primary/20  outline-none overflow-y-scroll noScrollBar opacity-70"
        ></textarea>
        <input onChange={handleFileSelected} ref={fileInputRef} type="file" className="hidden" />
        <button ref={submitButtonRef} className=" text-[22px] px-4 py-2 rounded-lg  opacity-50 hover:opacity-100" type="submit">
        <Icon icon="fa:send-o"   />
        </button>
    </form>
    <button  onClick={handleFileInput} className={` ${file!==null ?'text-primary5': 'opacity-50 hover:opacity-100'}`}>
        <Icon icon="humbleicons:image" width="24" height="24"  />
    </button>

    </div>
  )
})

export default MessageInput