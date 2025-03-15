import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const ContactCard = ({contact}:any) => {
    console.log(contact);
    
  return (
    <div className='flex w-full py-4 px-4 items-center gap-x-4 bg-transparent hover:bg-primary/10 cursor-pointer rounded-[10px]'>
        <div className='h-12 w-12 rounded-full flex justify-center items-center bg-primary/20 relative'>
            <span className='absolute h-3 w-3 rounded-full bg-green-700 top-0 left-9 border-[1px] border-green-300'></span>
            {(contact.profileImage &&contact.profileImage) !=='' ? <img src={contact.profileImage} alt="profile" className='h-[70%] w-[70%] object-cover object-center rounded-full' /> : <Icon icon="ix:user-profile-filled"   className='text-base-200 size-[70%]' />}
        </div>
        <div>
            <h3 className='font-bold capitalize'>{contact.username}</h3>
            <p className='opacity-40 text-[10px]'>{contact.email}</p>
        </div>

    </div>
  )
}

export default ContactCard