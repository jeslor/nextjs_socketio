import { useCurrentUserStore } from "@/components/providers/userProvider";
import { formatTimestamp } from "@/lib/helper/timeHelper";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const MessageBubble = ({ message }: any) => {
  const { currentUser } = useCurrentUserStore();

  return (
    <div
      key={message._id}
      className={`chat chat-${
        message.sender._id === currentUser._id ? "end" : "start"
      } mb-7`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          {message.sender._id == currentUser._id ? (
            currentUser.profileImage ? (
              <img src={currentUser.profileImage} alt="user" />
            ) : (
              <img src="/images/avatar.png" alt="user" />
            )
          ) : message.sender.profileImage ? (
            <img src={message.sender.profileImage} alt="user" />
          ) : (
            <div className="bg-primary/20 h-full w-full flex items-center justify-center rounded-full">
              <Icon
              icon="ix:user-profile-filled" 
              className="h-full w-full text-base-200"
              />
            </div>
          )}
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50">
          {formatTimestamp(message.createdAt)}
        </time>
      </div>
      <div className="chat-bubble bg-primary/10">
        {message.file && (
          <div className="flex flex-col items-center gap-2 h-[150px]">
            <img
              src={message.file}
              alt="file"
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
        )}
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
