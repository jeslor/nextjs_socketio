"use client";
import React, { memo, useEffect, useRef } from "react";
import { formatTimestamp } from "@/lib/helper/timeHelper";
import { useMessageStore } from "@/components/providers/messageProvider";
import { useCurrentUserStore } from "@/components/providers/userProvider";
import ChatContainerSkeleton from "../ChatContainerSkepeton/ChatContainerSkeleton";
import MessageBubble from "../MessageBubble/MessageBubble";

const MessageContainer = () => {
  const { messages, isMessagesLoading, listenToMesages, unsubscribeToMessages, inputTouched } = useMessageStore();

  console.log(inputTouched);
  
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    // Scroll to the latest message when messages change
    if (messagesEndRef.current) {
      if (inputTouched) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }else{
        messagesEndRef.current.scrollIntoView();
      }
    }
  }, [messages]);

  

  return (
    <div className="flex-1 p-4 bg-base-300 h-full overflow-y-scroll">
       <div className="  flex flex-col justify-end gap-4 min-h-full">
      {isMessagesLoading ? (
        <ChatContainerSkeleton />
      ) : (
        <>
          {messages.map((message: any) => <MessageBubble key={message._id} message={message} />)}
          {/* Empty div to track the end of the messages */}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
    </div>
   
  );
};

export default MessageContainer;