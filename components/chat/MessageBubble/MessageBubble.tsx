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
        message.sender._id === currentUser._id ? "end ml-auto" : "start mr-auto"
      } mb-2 max-w-[75%] w-full popIn`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full bg-primary/40">
          {message.sender._id == currentUser._id ? (
            currentUser.profileImage ? (
              <img src={currentUser.profileImage} alt="user" />
            ) : (
              <div className="bg-primary/20 h-full w-full flex items-center justify-center rounded-full">
              <Icon
              icon="ix:user-profile-filled" 
              className="h-full w-full text-base-200"
              />
            </div>
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
        <time className="text-xs opacity-30">
          {formatTimestamp(message.createdAt)}
        </time>
      </div>
      <div className={`chat-bubble  ${message.sender._id === currentUser._id ?'bg-base-100 text-primary/90':'bg-primary text-base-200 '} `}>
        {message.file && (
          <div className="flex flex-col items-center gap-2 h-[150px] bg-white rounded-[10px] mb-2">
            <img
              src={message.file}
              alt="file"
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
        )}
        <pre className=" whitespace-pre-wrap font-sans break-words">{message.text}</pre>
      </div>
    </div>
  );
};

export default MessageBubble;
