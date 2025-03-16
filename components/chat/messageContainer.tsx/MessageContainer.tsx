"use client"
import { useMessageStore } from '@/components/providers/messageProvider'
import { useCurrentUserStore } from '@/components/providers/userProvider'
import React, { useEffect } from 'react'

const MessageContainer = () => {
  const {currentUser, selectedUser} = useCurrentUserStore()
  const {messages, setMessages, isMessagesLoading} = useMessageStore()

  useEffect(() => {
    if (currentUser && selectedUser) {
      console.log(currentUser._id, selectedUser._id);
      
      setMessages(currentUser._id, selectedUser._id)
      
    }
  }, [currentUser, selectedUser])
  


  

  return (
    <div className='flex-1 p-4 bg-base-300 overflow-y-scroll'>
      {isMessagesLoading ? (
        <div>Loading...</div>
      ) : (
        messages.map((message: any) => (
          <div key={message._id} className='flex flex-col'>
            <div className='flex'>
              <div
                className={`${
                  message.sender === currentUser._id
                    ? 'bg-primary'
                    : 'bg-base-100'
                } p-2 rounded-lg`}
              >
                {message.text}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default MessageContainer