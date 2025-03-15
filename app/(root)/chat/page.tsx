"use client"

import ContactCard from "@/components/ContactCard/ContactCard"
import { useCurrentUserStore } from "@/components/providers/userProvider"
import { useEffect } from "react"

const page = () => {
  const {setContacts, contacts, currentUser} = useCurrentUserStore()
  

  
  useEffect(() => {
    setContacts(currentUser)
  }, [currentUser])


  console.log(contacts);
  
  

  
  return (
    <div className="flex flex-1">
      <aside className="max-w-[340px] w-full border-r-[1px] border-primary/20">
        <div className="bg-base-200 p-4 w-full">
        <h2 className="font-bold px-5">Chats</h2>
        </div>
        <div className="px-4 flax flex-col gap-y-4 py-4">
        {contacts.map((contact: any) => <ContactCard key={contact._id} contact={contact} />)}
        </div>
       
      </aside>
      <div>

      </div>
    </div>
  )
}

export default page