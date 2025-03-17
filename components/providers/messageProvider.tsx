"use client";
import { create } from 'zustand';
import {useCurrentUserStore} from  '@/components/providers/userProvider'
import { getMessages, newMessage } from '@/lib/actions/message.actions';

export const useMessageStore = create<any>((set, get) => ({
    messages: [],
    isMessagesLoading: false,


    setMessages: async (currentUserId:string,selectedUserId:string) => {
        
        set({ isMessagesLoading: true });
        if(currentUserId && selectedUserId){
            const messages = await getMessages(currentUserId, selectedUserId);
            if(messages){
                set({ messages: messages.data });
            }
        }
        set({ isMessagesLoading: false });
    },

    subscribeToMessages: async({text, file, senderId, receiverId }:any)=>{
        try {
            await newMessage({text, file, senderId, receiverId})
            .then((savedMessage:any)=>{
                if(savedMessage.status !== 200){
                    throw new Error("Error sending message");
                }
                set({ messages: [...get().messages, savedMessage.data] });
    
                const socket = useCurrentUserStore.getState().mySocket;
                socket.emit("newMessage", savedMessage.data);
            })
          

        } catch (error) {
            console.log(error);
            
        }
       
    },

    listenToMesages : ()=>{
        const socket = useCurrentUserStore.getState().mySocket;
        if (socket) {
            socket.on("newMessage", (message:any) => {
                set({ messages: [...get().messages, message] });
            });
    
}
    },
    unsubscribeToMessages: ()=>{
        const socket = useCurrentUserStore.getState().mySocket;
      if (socket) {
        socket.off("newMessage");
        
      }
    }
    }));