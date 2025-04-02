"use client"
import { useCurrentUserStore } from '@/components/providers/userProvider';
import React, { memo, useEffect } from 'react'
import ContactCard from '../ContactCard/ContactCard';
import ContactSkeleton from '../ContactSkeleton/ContactSkeleton';

const ChatContacts = memo(({expand, searchQuery}:{expand:boolean, searchQuery:string}) => {
    const {contacts, isLoadingContacts, currentUser} = useCurrentUserStore();
    const [currContacts, setCurrContacts] = React.useState<any[]>([]);
    const [yourContacts, setYourContacts] = React.useState<any[]>([]);
    const [otherContacts, setOtherContacts] = React.useState<any[]>([]);
    

    useEffect(() => {
      let currentUserContactIds = currentUser?.contacts.map((contactId: any) => contactId._id);
        if(contacts.length>0){
         if(searchQuery.length>0){
          let LowerCaseSearchQuery = searchQuery.toLowerCase();
          setYourContacts(contacts.filter((contact: any) => {
            return (contact.username.toLowerCase().includes(LowerCaseSearchQuery)|| contact.email.toLowerCase().includes(LowerCaseSearchQuery)) && currentUserContactIds.includes(contact._id)
           }))
          setOtherContacts(contacts.filter((contact: any) => {
            return (contact.username.toLowerCase().includes(LowerCaseSearchQuery)|| contact.email.toLowerCase().includes(LowerCaseSearchQuery)) && !currentUserContactIds.includes(contact._id)
           }))
         
         
         }else{
          setYourContacts(contacts.filter((contact: any) => currentUserContactIds.includes(contact._id)))
          setOtherContacts(contacts.filter((contact: any) => !currentUserContactIds.includes(contact._id)))
         }
        }
    }
    ,[contacts, searchQuery, currentUser, currentUser?.contacts])
  

  return (
    <div className="px-4 flex flex-col gap-y-2 py-4 h-[calc(100vh-70px)] overflow-y-scroll pb-7">
    {isLoadingContacts
    ? <ContactSkeleton /> 
    :<>
    <h3 className='font-bold'>YourContacts</h3>
    {yourContacts.length > 0 ? yourContacts.map((contact: any) => <ContactCard key={contact._id} contact={contact} expand={expand} />) : <p className='text-gray-500'>No contacts found</p>}
    <h3 className='font-bold'>Other users</h3>
    {otherContacts.length > 0 ? otherContacts.map((contact: any) => <ContactCard key={contact._id} contact={contact} expand={expand} />) : <p className='text-gray-500'>No contacts found</p>}
    </>}
    </div>
  )
})

export default ChatContacts


// currContacts.map((contact: any) => <ContactCard key={contact._id} contact={contact} expand={expand} />