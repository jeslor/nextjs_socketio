import { useCurrentUserStore } from '@/components/providers/userProvider'
import { getNotifications } from '@/lib/actions/user.actions'
import { Icon } from '@iconify/react/dist/iconify.js'
import React, { memo, use, useCallback, useEffect } from 'react'

const ContactCard = memo(({contact, expand}:any) => {
    const {setSelectedUser,selectedUser, onlineContacts} = useCurrentUserStore()
    const [notifications, setNotifications] = React.useState([]);

    const userNotifications = useCallback(async()=>{
        const response = await getNotifications(contact._id)

        if(response.status === 200){
            setNotifications(response.data.unreadMessages)
        }
    }
    ,[contact])

    const handleSelectUser = useCallback(() => {
        setSelectedUser(contact)
    }, [contact])


    useEffect(() => {
        userNotifications()
    }
    ,[])

    
  return (
    <div onClick={handleSelectUser} className={`flex w-full py-2 tablet:px-4 items-center gap-x-4  hover:bg-primary/10 cursor-pointer rounded-[10px] ${selectedUser?._id === contact._id ? 'bg-primary/10':'bg-transparent'}`}>
        <div className='h-12 w-12 rounded-full flex justify-center items-center bg-primary/20 relative'>
            {onlineContacts.includes(contact._id) && <span className='absolute h-3 w-3 rounded-full bg-green-700 top-0 left-9 border-[1px] border-green-300'></span>}
            {(contact.profileImage &&contact.profileImage) !=='' ? <img src={contact.profileImage} alt="profile" className='h-[85%] w-[85%] object-cover object-center rounded-full' /> : <Icon icon="ix:user-profile-filled"   className='text-base-200 size-[70%]' />}
        </div>
        <div className={`w-full flex-1 ${expand?'':'hidden'} tablet:flex flex-col`}>
            <h3 className='font-bold capitalize text-primary relative w-full'>
                {contact.username} 
                {notifications.length?<span className='absolute right-1 top-0 h-6 w-6 rounded-full flex justify-center items-center bg-black border-[1px] border-gray-100/50 text-white text-[9px]'>{notifications.length}</span>:''}
                </h3>
            <p className='opacity-40 text-[10px]'>{contact.email}</p>
        </div>

    </div>
  )
})

export default ContactCard