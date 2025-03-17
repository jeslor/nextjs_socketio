"use client";
import React, { memo, useEffect, useRef } from "react";
import { formatTimestamp } from "@/lib/helper/timeHelper";
import { useMessageStore } from "@/components/providers/messageProvider";
import { useCurrentUserStore } from "@/components/providers/userProvider";
import ChatContainerSkeleton from "../ChatContainerSkepeton/ChatContainerSkeleton";
import MessageBubble from "../MessageBubble/MessageBubble";

const MessageContainer = () => {
  const { currentUser, selectedUser, mySocket } = useCurrentUserStore();
  const { messages, setMessages, isMessagesLoading, listenToMesages, unsubscribeToMessages } = useMessageStore();
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (currentUser && selectedUser) {
      setMessages(currentUser._id, selectedUser._id);
    }
  }, [selectedUser]);


  useEffect(() => {
    listenToMesages();
    return () => {
      unsubscribeToMessages();
    };
  }, [mySocket]);

  useEffect(() => {
    // Scroll to the latest message when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  

  return (
    <div className="flex-1 p-4 bg-base-300 overflow-y-scroll">
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
  );
};

export default MessageContainer;