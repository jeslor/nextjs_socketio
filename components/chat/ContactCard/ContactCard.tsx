import { useMessageStore } from '@/components/providers/messageProvider'
import { useCurrentUserStore } from '@/components/providers/userProvider'
import { Icon } from '@iconify/react/dist/iconify.js'
import { set } from 'mongoose'
import React, { memo, useCallback, useEffect, useState } from 'react'

const ContactCard = memo(({contact, expand}:any) => {
    const {setSelectedUser,selectedUser, onlineContacts, currentUser} = useCurrentUserStore()
    const {messageNotification, messages} = useMessageStore();
    const [notifications, setNotifications] = useState<any>([]);
    const [recentMessage, setRecentMessage] = useState<any>('');
    


    const handleSelectUser = useCallback(() => {
        setSelectedUser(contact)
    }, [contact])


    useEffect(() => {
        if(messageNotification.length > 0){
        const unreadMessages = messageNotification.filter((message:any) => message.sender._id === contact._id);
        setNotifications(unreadMessages);
        }
    }
    ,[messageNotification, contact._id])


    useEffect(() => {
        if(notifications.length > 0){
            setRecentMessage(notifications[0].text);
        }else{
                setRecentMessage(contact.email);
            
        }
        },[notifications, contact._id, messages])

    
  return (
    <div onClick={handleSelectUser} className={`flex w-full py-2 tablet:px-4 items-center gap-x-4  hover:bg-primary/10 cursor-pointer rounded-[10px] ${selectedUser?._id === contact._id ? 'bg-primary/10':'bg-primary/3'}`}>
        <div className='h-12 w-12 rounded-full flex justify-center items-center bg-primary/20 relative flex-shrink-0'>
            {onlineContacts.includes(contact._id) && <span className='absolute h-3 w-3 rounded-full bg-green-700 top-0 left-9 border-[1px] border-green-300'></span>}
            {(contact.profileImage &&contact.profileImage) !=='' ? <img src={contact.profileImage} alt="profile" className='h-[85%] w-[85%] object-cover object-center rounded-full' /> : <Icon icon="ix:user-profile-filled"   className='text-base-200 size-[70%]' />}
        </div>
        <div className={` w-[80%] ${expand?'':'hidden'} tablet:flex flex-col`}>
            <h3 className='font-bold capitalize text-primary relative w-full'>
                {contact.username} 
                {notifications.length?<span className='absolute right-1 top-0 h-5 min-w-5 rounded-full flex justify-center items-center bg-green-700 border-[1px] border-gray-100/50 text-white text-[10px]'>{notifications.length}</span>:''}
                </h3>
            <p className=' text-[12px] myTextElipsis pr-2 relative h-6 text-semibold'>
                <span className='opacity-60 '>{recentMessage!==''?recentMessage:<Icon icon="material-symbols:photo-camera-rounded"  className='text-[22px]' />}</span>
            </p>
        </div>

    </div>
  )
})

export default ContactCard