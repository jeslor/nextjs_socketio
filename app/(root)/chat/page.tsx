"use client"

import ChatBar from "@/components/chat/ChatBar/ChatBar"
import ContactCard from "@/components/chat/ContactCard/ContactCard"
import ContactSkeleton from "@/components/chat/ContactSkeleton/ContactSkeleton"
import MessageInput from "@/components/chat/MessageInput/MessageInput"
import { useCurrentUserStore } from "@/components/providers/userProvider"
import { useEffect, useState } from "react"

const page = () => {
  const {setContacts, contacts, currentUser, selectedUser, isLoadingContacts} = useCurrentUserStore()


  
  return (
    <div className="flex flex-1">
      <aside className="max-w-[340px] w-full border-r-[1px] border-primary/20 bg-base-200">
        <div className="bg-base-200 p-4 h-[70px] w-full">
        <h2 className="font-bold px-5">Chats</h2>
        </div>
        <div className="px-4 flex flex-col gap-y-2 py-4 h-[calc(100vh-70px)] overflow-y-scroll pb-7">
        {isLoadingContacts
        ? <ContactSkeleton /> 
        :contacts.map((contact: any) => <ContactCard key={contact._id} contact={contact} />)}
        </div>
      </aside>
      <div className="h-full w-full flex flex-col ">
        {selectedUser &&<ChatBar /> }
        <div className="flex-1 p-4 bg-base-300">
          message container
        </div>
        <MessageInput />
      </div>
    </div>
  )
}

export default page