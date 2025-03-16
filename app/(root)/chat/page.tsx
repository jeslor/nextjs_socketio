"use client"

import ChatBar from "@/components/chat/ChatBar/ChatBar"
import ContactCard from "@/components/chat/ContactCard/ContactCard"
import ContactSkeleton from "@/components/chat/ContactSkeleton/ContactSkeleton"
import MessageContainer from "@/components/chat/messageContainer.tsx/MessageContainer"
import MessageInput from "@/components/chat/MessageInput/MessageInput"
import { useCurrentUserStore } from "@/components/providers/userProvider"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

const page = () => {
  const {data:session}:any = useSession()
  const { currentUser,contacts, setContacts, isLoadingContacts,selectedUser,setCurrentUser, setSelectedUser } = useCurrentUserStore();

  useEffect(() => {
    if (session) {
      setCurrentUser(session.user.email);
    }
  }, [session]);

  useEffect(() => {
    if (currentUser) {
      setContacts(currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if(contacts){
      if (!selectedUser) {
        setSelectedUser(contacts[0]);
      }
    }
  }
  ,[contacts, selectedUser])


  
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
        <MessageContainer />
        <MessageInput />
      </div>
    </div>
  )
}

export default page