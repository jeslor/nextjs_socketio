"use client"
import { useCurrentUserStore } from '@/components/providers/userProvider';
import React, { memo, useEffect } from 'react'
import ContactCard from '../ContactCard/ContactCard';
import ContactSkeleton from '../ContactSkeleton/ContactSkeleton';

const ChatContacts = memo(({expand}:{expand:boolean}) => {
    const {contacts, isLoadingContacts, currentUser} = useCurrentUserStore();
    const [currContacts, setCurrContacts] = React.useState<any[]>([]);
    

    useEffect(() => {
        if(contacts.length>0){
          setCurrContacts(contacts);
        }
    }
    ,[contacts])
  

  return (
    <div className="px-4 flex flex-col gap-y-2 py-4 h-[calc(100vh-70px)] overflow-y-scroll pb-7">
    {isLoadingContacts
    ? <ContactSkeleton /> 
    :currContacts.map((contact: any) => <ContactCard key={contact._id} contact={contact} expand={expand} />)}
    </div>
  )
})

export default ChatContacts