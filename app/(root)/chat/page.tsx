"use client"

import ChatBar from "@/components/chat/ChatBar/ChatBar"
import ChatContacts from "@/components/chat/ChatContacts/ChatContacts"
import MessageContainer from "@/components/chat/messageContainer.tsx/MessageContainer"
import MessageInput from "@/components/chat/MessageInput/MessageInput"
import { useCurrentUserStore } from "@/components/providers/userProvider"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useEffect, useState } from "react"

const page = () => {
  const [expand, setExpand] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { selectedUser } = useCurrentUserStore();


  useEffect(() => {
    document.addEventListener('click', (e) => {
      const searchComponent = document.querySelector('.search-component');
      if (searchComponent && !searchComponent.contains(e.target as Node)) {
        setExpand(false);
      }else{
        setExpand(true);
      }
    })

    return () => {
      document.removeEventListener('click', (e) => {
        const searchComponent = document.querySelector('.search-component');
        if (searchComponent && !searchComponent.contains(e.target as Node)) {
          setExpand(false);
        }else{
          setExpand(true);
        }
      })
    }
  

},[])

const handleSearchQueryChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.stopPropagation();
  setSearchQuery(e.target.value);
}
const handleClearSearchQuery=(e:any)=>{
  e.preventDefault();
  e.stopPropagation();
  setSearchQuery('');}
  
  return (
    <div className="flex flex-1">
      <aside className="tablet:max-w-[340px] tablet:w-full border-r-[1px] border-primary/20 bg-base-200">
        <div className="bg-base-200 p-4 h-[30px] w-full">
        <h2 className="font-bold tablet:px-5">Chats</h2>
        </div>
          <div  className=" bg-base-200  mt-5 mx-4  flex items-center border-[0.5px] relative rounded-[5px] border-primary/35">
              <Icon icon="akar-icons:search" className="text-primary/70 absolute ml-1.5 " />
              <input onChange={handleSearchQueryChanged} value={searchQuery}  type="text" placeholder="Search" className={`search-component h-[30px] bg-transparent text-primary/70 text-[13px] pl-7 pr-4 focus:outline-0 focus:text-primary ${expand?'w-[280px]':'w-full'} transition`} />
              <button onClick={handleClearSearchQuery} className={`size-[18px] text-[11px] rounded-full flex justify-center items-center bg-primary/10 hover:bg-primary/20 transition ${searchQuery.length>0?'':'hidden'}`}>
                <Icon icon="material-symbols:close-rounded" className={`text-primary/70 ${searchQuery.length>0?'':'hidden'} transition`}  />
              </button>
          </div>
        <ChatContacts expand={expand} searchQuery={searchQuery} />
      </aside>
      <div className="h-full w-full flex flex-col ">
        {selectedUser &&<ChatBar /> }
        <MessageContainer />
        <MessageInput />
      </div>
    </div>
  )
}

export default page