"use client"
import { useCurrentUserStore } from '@/components/providers/userProvider';
import React, { memo } from 'react'
import ContactCard from '../ContactCard/ContactCard';
import ContactSkeleton from '../ContactSkeleton/ContactSkeleton';

const ChatContacts = memo(() => {
    const {contacts, isLoadingContacts} = useCurrentUserStore();
  return (
    <div className="px-4 flex flex-col gap-y-2 py-4 h-[calc(100vh-70px)] overflow-y-scroll pb-7">
    {isLoadingContacts
    ? <ContactSkeleton /> 
    :contacts.map((contact: any) => <ContactCard key={contact._id} contact={contact} />)}
    </div>
  )
})

export default ChatContacts