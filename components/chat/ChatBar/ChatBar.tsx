import { useCurrentUserStore } from '@/components/providers/userProvider'
import { addToContacts } from '@/lib/actions/user.actions'

import { Icon } from '@iconify/react/dist/iconify.js'
import React, { memo, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const ChatBar = memo(() => {
    const [adding, setAdding] = React.useState(false)
    const {selectedUser, setSelectedUser, onlineContacts, currentUser, updateCurrentUser} = useCurrentUserStore()
    const [alreadyAContact, setAlreadyAContact] = useState<boolean>(false);
    
    
    const addContact = async () => {
        try {
            setAdding(true)
            const updatedUser = await addToContacts(currentUser._id, selectedUser._id)
            if (updatedUser.status === 200) {
                updateCurrentUser(updatedUser.data)
                toast.success('Contact added successfully')
            }
            if (updatedUser.status !== 200) {
                throw new Error('Error adding contact')
                
            }
        } catch (error) {
            console.log('Error in updating current user with contacts', error);
        }finally{
            setAdding(false)
        }

    }

    useEffect(() => {
        if(selectedUser){
            currentUser.contacts.map((user:any)=>user._id).includes(selectedUser._id)?setAlreadyAContact(true):setAlreadyAContact(false)
        }
    }, [currentUser.contacts, selectedUser])

  return (
    <div className='h-[70px] w-full bg-base-200 p-4 flex justify-between items-center'>
        {}
        <div className='flex items-center'>
            {selectedUser.profileImage&&selectedUser.profileImage.length>0?<img src={selectedUser.profileImage} alt="" className='w-10 h-10 rounded-full mr-4'/>:<div className='flex justify-center items-center w-10 h-10 rounded-full mr-4 bg-primary/20'><Icon icon="ix:user-profile-filled"   className='text-base-200 size-[70%]' /></div>}
            <div>
                <h3 className='font-bold'>{selectedUser.username}</h3>
                <p className='opacity-40 text-[10px]'>{onlineContacts.includes(selectedUser._id)?'online':'offline'}</p>
            </div>
        </div>
        <div className='flex gap-x-4'>
            <button className='text-[17px] hover:bg-primary/10 rounded-full p-2 cursor-pointer'>
                <Icon icon="akar-icons:phone" className='text-primary text-[22px]' />
            </button>
            <button className='text-[17px] hover:bg-primary/10 rounded-full p-2 cursor-pointer'>
                <Icon icon="akar-icons:video" className='text-primary text-[22px]' />
            </button>
            {!alreadyAContact&&<button onClick={addContact} className='text-[17px] hover:bg-primary/10 rounded-full p-2 cursor-pointer'>
                <Icon icon="mi:user-add" className='text-primary text-[22px]' />
            </button>}
            <button onClick={() => setSelectedUser(null)} className='text-[17px] hover:bg-primary/10 rounded-full p-2 cursor-pointer'>
            <Icon icon="ic:baseline-close" className='text-primary text-[22px]'/>
            </button>
        </div>
      
            
    </div>
  )
})

export default ChatBar