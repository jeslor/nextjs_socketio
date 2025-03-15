import { useCurrentUserStore } from '@/components/providers/userProvider'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const ChatBar = () => {
    const {selectedUser} = useCurrentUserStore()
  return (
    <div className='h-[70px] w-full bg-base-200 p-4 flex justify-between items-center'>
        <div className='flex items-center'>
            {selectedUser.profileImage&&selectedUser.profileImage.length>0?<img src={selectedUser.profileImage} alt="" className='w-10 h-10 rounded-full mr-4'/>:<div className='flex justify-center items-center w-10 h-10 rounded-full mr-4 bg-primary/20'><Icon icon="ix:user-profile-filled"   className='text-base-200 size-[70%]' /></div>}
            <div>
                <h3 className='font-bold'>{selectedUser.username}</h3>
                <p className='opacity-40 text-[10px]'>Online</p>
            </div>
        </div>
      
            
    </div>
  )
}

export default ChatBar