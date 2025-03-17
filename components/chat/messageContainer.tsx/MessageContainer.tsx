"use client";
import React, { memo, useEffect } from "react";
import {formatTimestamp} from "@/lib/helper/timeHelper"
import { useMessageStore } from "@/components/providers/messageProvider";
import { useCurrentUserStore } from "@/components/providers/userProvider";
import ChatContainerSkeleton from "../ChatContainerSkepeton/ChatContainerSkeleton";

const MessageContainer = memo(() => {
  const { currentUser, selectedUser } = useCurrentUserStore();
  const { messages, setMessages, isMessagesLoading } = useMessageStore();

  useEffect(() => {
    if (currentUser && selectedUser) {
      setMessages(currentUser._id, selectedUser._id);
    }
  }, [, selectedUser]);
  

  return (
    <div className="flex-1 p-4 bg-base-300 overflow-y-scroll">
      {isMessagesLoading ? (
        <ChatContainerSkeleton />
      ) : 
          messages.map((message:any)=>(
            message.sender._id === currentUser._id?
            (
              <div key={message._id} className="chat chat-end mb-7 ">
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
                      <img src={message.file
                      } alt="file" className="w-full h-full object-cover rounded-[10px]s" />
                      </div>
                  )
                  }
                <p>{message.text}</p>
              </div>
              {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
            </div>
            )
            :(
              <div key={message._id} className="chat chat-start mb-7">
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
              <div className="chat-bubble bg-primary">
                {message.file && (
                  <div className="flex flex-col items-center gap-2 h-[150px]">
                    <img src={message.file
                    } alt="file" className="w-full h-full object-cover rounded-[10px]s" />
                    </div>
                )
                }
                <p>{message.text}</p>
              </div>
              {/* <div className="chat-footer opacity-50">Delivered</div> */}
            </div>
            )
          ))
        }
    </div>
  );
});

export default MessageContainer;
