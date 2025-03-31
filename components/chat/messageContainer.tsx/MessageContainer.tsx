"use client";
import React, { memo, useEffect, useRef } from "react";
import { useMessageStore } from "@/components/providers/messageProvider";
import ChatContainerSkeleton from "../ChatContainerSkepeton/ChatContainerSkeleton";
import MessageBubble from "../MessageBubble/MessageBubble";

const MessageContainer = () => {
  const { messages, isMessagesLoading, listenToMesages, unsubscribeToMessages, inputTouched } = useMessageStore();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  console.log("messages", messages);



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
    <div className="flex-1 p-4 bg-base-300 h-full overflow-y-scroll w-screen  tablet:w-full">
       <div className="  flex flex-col justify-end gap-4 min-h-full ">
      {
      isMessagesLoading ? (
        <ChatContainerSkeleton />
      ) : 
        <>{
          messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <h1 className="text-2xl text-primary/60">No messages yet</h1>
            </div>
          ) :messages.map((message: any) => <MessageBubble key={message._id} message={message} />)}
          <div ref={messagesEndRef} />
        </>
      }
    </div>
    </div>
   
  );
};

export default MessageContainer;