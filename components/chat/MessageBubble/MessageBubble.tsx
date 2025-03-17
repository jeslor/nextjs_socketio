import { useCurrentUserStore } from '@/components/providers/userProvider';
import { formatTimestamp } from '@/lib/helper/timeHelper'
import React from 'react'

const MessageBubble = ({message}:any) => {
      const { currentUser } = useCurrentUserStore();

    
  return (
    <div key={message._id} className={`chat chat-${message.sender._id === currentUser._id ? 'end' : 'start'} mb-7`}>
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img
          alt="Tailwind CSS chat bubble component"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
      </div>
    </div>
    <div className="chat-header">
      <time className="text-xs opacity-50">{formatTimestamp(message.createdAt)}</time>
    </div>
    <div className="chat-bubble bg-primary/10">
      {message.file && (
        <div className="flex flex-col items-center gap-2 h-[150px]">
          <img src={message.file} alt="file" className="w-full h-full object-cover rounded-[10px]" />
        </div>
      )}
      <p>{message.text}</p>
    </div>
  </div>
  )
}

export default MessageBubble