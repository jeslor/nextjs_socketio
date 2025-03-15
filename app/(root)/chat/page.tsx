"use client"

import ChatBar from "@/components/chat/ChatBar/ChatBar"
import ContactCard from "@/components/chat/ContactCard/ContactCard"
import { useCurrentUserStore } from "@/components/providers/userProvider"
import { useEffect } from "react"

const page = () => {
  const {setContacts, contacts, currentUser, selectedUser} = useCurrentUserStore()
  

  
  useEffect(() => {
    setContacts(currentUser)
  }, [currentUser])

  
  return (
    <div className="flex flex-1">
      <aside className="max-w-[340px] w-full border-r-[1px] border-primary/20 bg-base-200">
        <div className="bg-base-200 p-4 h-[70px] w-full">
        <h2 className="font-bold px-5">Chats</h2>
        </div>
        <div className="px-4 flax flex-col gap-y-4 py-4">
        {contacts.map((contact: any) => <ContactCard key={contact._id} contact={contact} />)}
        </div>
      </aside>
      <div className="flex-1">
        {selectedUser &&<ChatBar /> }

      </div>
    </div>
  )
}

export default page