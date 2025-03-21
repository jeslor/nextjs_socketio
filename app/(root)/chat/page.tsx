"use client"

import ChatBar from "@/components/chat/ChatBar/ChatBar"
import ChatContacts from "@/components/chat/ChatContacts/ChatContacts"
import MessageContainer from "@/components/chat/messageContainer.tsx/MessageContainer"
import MessageInput from "@/components/chat/MessageInput/MessageInput"
import { useCurrentUserStore } from "@/components/providers/userProvider"
import { useSession } from "next-auth/react"
import { useEffect, memo } from "react"

const page = memo(() => {
  const { selectedUser } = useCurrentUserStore();

  
  return (
    <div className="flex flex-1">
      <aside className="max-w-[340px] w-full border-r-[1px] border-primary/20 bg-base-200">
        <div className="bg-base-200 p-4 h-[70px] w-full">
        <h2 className="font-bold px-5">Chats</h2>
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
})

export default page