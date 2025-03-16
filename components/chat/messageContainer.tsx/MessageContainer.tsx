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
      console.log(currentUser._id, selectedUser._id);

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
              <div className="chat chat-end">
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
              <div className="chat-bubble bg-primary/10">{message.text}</div>
              {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
            </div>
            )
            :(
              <div className="chat chat-start">
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
              <div className="chat-bubble bg-primary">{message.text}</div>
              {/* <div className="chat-footer opacity-50">Delivered</div> */}
            </div>
            )
          ))
        }
    </div>
  );
});

export default MessageContainer;
