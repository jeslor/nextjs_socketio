"use client";
import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { useCurrentUserStore } from "@/components/providers/userProvider";
import {
  getMessages,
  newMessage,
  unReadMessages,
  updateReadMessages,
} from "@/lib/actions/message.actions";

export const useMessageStore = create<any>((set, get) => ({
  // load first th local mssages before fetching from the server
  messages: [],
  messageNotification: [],
  isMessagesLoading: false,
  inputTouched: false,

  setInPutTouched: (touched: boolean) => {
    set({ inputTouched: touched });
  },

  setMessages: async (currentUserId: string, selectedUserId: string) => {
    try {
      set({ isMessagesLoading: true });
      set({ inputTouched: false });
      if (currentUserId && selectedUserId) {
        const messages = await getMessages(currentUserId, selectedUserId);

        if (messages) {
          set({ messages: messages.data });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isMessagesLoading: false });

      // set({inputTouched: true});
    }
  },

  setNotifications: (currentUser: any) => {
    const unreadMessages = currentUser.unreadMessages;
    set({ messageNotification: unreadMessages });
  },

  getUnreadMessages: async (selectedContactID: string) => {
    const unreadMessages = get().messageNotification;
    if (!unreadMessages) {
      return;
    }

    const setMessagesToSelectedUserUnread = [
      ...unreadMessages
        .filter((message: any) => message.sender._id === selectedContactID)
        .map((message: any) => {
          return {
            ...message,
            seen: true,
          };
        }),
    ];
    set({ messages: [...get().messages, ...setMessagesToSelectedUserUnread] });
    set({
      messageNotification: unreadMessages.filter(
        (message: any) => message.sender._id !== selectedContactID
      ),
    });
    if (setMessagesToSelectedUserUnread.length === 0) {
      return;
        
    }

    
    const updateUserUnreadMessagesToRead = await updateReadMessages(
      useCurrentUserStore.getState().currentUser._id,
      setMessagesToSelectedUserUnread.map((message: any) => message._id)
    );
    if (updateUserUnreadMessagesToRead.status !== 200) {
      console.log("Error updating unread messages");
    }
    set({ messageNotification: updateUserUnreadMessagesToRead.data.unreadMessages });
  },

  subscribeToMessages: async ({ text, file, senderId, receiverId }: any) => {
    try {
      if (!text && !file) {
        return;
      }
      const currentUser = useCurrentUserStore.getState().currentUser;
      const selectedUser = useCurrentUserStore.getState().selectedUser;
      set({
        messages: [
          ...get().messages,
          {
            _id: uuidv4(),
            text,
            file,
            sender: currentUser,
            receiver: selectedUser,
            createdAt: new Date(),
          },
        ],
      });
      await newMessage({ text, file, senderId, receiverId }).then(
        (savedMessage: any) => {
          if (savedMessage.status !== 200) {
            throw new Error("Error sending message");
          }
          const socket = useCurrentUserStore.getState().mySocket;
          socket.emit("newMessage", savedMessage.data);
        }
      );
    } catch (error) {
      console.log(error);
    }
  },

  listenToMesages: () => {
    const socket = useCurrentUserStore.getState().mySocket;
    if (socket) {
      socket.on("newMessage", async (message: any) => {
        if (
          message.sender._id === useCurrentUserStore.getState().selectedUser._id
        ) {
          set({ messages: [...get().messages, message] });
          const MessageRead = await updateReadMessages(
            useCurrentUserStore.getState().currentUser._id,
            [message._id]
          );
          if (MessageRead.status !== 200) {
            console.log(MessageRead.message);
          }
          if (MessageRead.status === 200) {
            console.log(MessageRead.message);
          }
        } else {
          console.log("not the selected user", message.sender.username);

          set({ messageNotification: [message, ...get().messageNotification] });
          console.log(get().messageNotification);

          console.log("added to unread messages", message.sender.username);

          const addedToUnread = await unReadMessages(
            useCurrentUserStore.getState().currentUser._id,
            message
          );
          if (addedToUnread.status !== 200) {
            console.log("Error adding to unread messages server error");
          }
        }
      });
    }
  },
  unsubscribeToMessages: () => {
    const socket = useCurrentUserStore.getState().mySocket;
    if (socket) {
      socket.off("newMessage");
    }
  },
}));
