"use client"
import { useCurrentUserStore } from '@/components/providers/userProvider';
import React, { memo, useEffect } from 'react'
import ContactCard from '../ContactCard/ContactCard';
import ContactSkeleton from '../ContactSkeleton/ContactSkeleton';

const ChatContacts = memo(() => {
    const {contacts, isLoadingContacts, currentUser, setContacts, selectedUser, setSelectedUser} = useCurrentUserStore();

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
    ,[contacts])

    

  return (
    <div className="px-4 flex flex-col gap-y-2 py-4 h-[calc(100vh-70px)] overflow-y-scroll pb-7">
    {isLoadingContacts
    ? <ContactSkeleton /> 
    :contacts.map((contact: any) => <ContactCard key={contact._id} contact={contact} />)}
    </div>
  )
})

export default ChatContacts