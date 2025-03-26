"use client"

import ChatBar from "@/components/chat/ChatBar/ChatBar"
import ChatContacts from "@/components/chat/ChatContacts/ChatContacts"
import MessageContainer from "@/components/chat/messageContainer.tsx/MessageContainer"
import MessageInput from "@/components/chat/MessageInput/MessageInput"
import { useCurrentUserStore } from "@/components/providers/userProvider"
import { Icon } from "@iconify/react/dist/iconify.js"

const page = () => {
  const { selectedUser } = useCurrentUserStore();
  
  return (
    <div className="flex flex-1">
      <aside className="max-w-[340px] w-full border-r-[1px] border-primary/20 bg-base-200">
        <div className="bg-base-200 p-4 h-[30px] w-full">
        <h2 className="font-bold px-5">Chats</h2>
        </div>
        <div className="bg-base-200  mt-5 mx-4  flex items-center border-[0.5px] relative rounded-[5px] border-primary/35">
              <Icon icon="akar-icons:search" className="text-primary/70 absolute ml-1.5 " />
              <input type="text" placeholder="Search" className="w-full h-[30px] bg-transparent text-primary/70 text-[13px] pl-7 pr-4 focus:outline-0 focus:text-primary" />
          </div>
        <ChatContacts />
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