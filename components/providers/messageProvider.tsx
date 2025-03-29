"use client";
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import {useCurrentUserStore} from  '@/components/providers/userProvider'
import { getMessages, getMostRecentMessage, newMessage } from '@/lib/actions/message.actions';

export const useMessageStore = create<any>((set, get) => ({
    // load first th local mssages before fetching from the server
    messages:  localStorage.getItem("messages") ? JSON.parse(localStorage.getItem("messages") as string) : [],
    isMessagesLoading: false,
    inputTouched: false,

    setInputTouched: (value:boolean)=>{
        set({inputTouched: value});
    },

    setMessages: async (currentUserId:string,selectedUserId:string) => {
        const localMessages = localStorage.getItem("messages");
        if(localMessages){
            set({ messages: JSON.parse(localMessages) });
            return;
        }
        
        set({ isMessagesLoading: true });
        const mostRecentMessage = await getMostRecentMessage(currentUserId, selectedUserId);
        if(mostRecentMessage.status !== 200  ){
            set({ isMessagesLoading: false });
            return;
        }
        console.log("most recent message", mostRecentMessage);
        
        if(currentUserId && selectedUserId){
            const messages = await getMessages(currentUserId, selectedUserId);
            if(messages){
                localStorage.setItem("messages", JSON.stringify(messages.data));
                set({ messages: messages.data });
            }
        }
        set({ isMessagesLoading: false });
    },

    subscribeToMessages: async({text, file, senderId, receiverId }:any)=>{
        try {
            if(!text && !file){
                return;
            }
            const currentUser = useCurrentUserStore.getState().currentUser;
            const selectedUser = useCurrentUserStore.getState().selectedUser;
            set({ messages: [...get().messages, {_id:uuidv4(), text,file,sender:currentUser, receiver:selectedUser, createdAt:new Date()}] });
            await newMessage({text, file, senderId, receiverId})
            .then((savedMessage:any)=>{
                if(savedMessage.status !== 200){
                    throw new Error("Error sending message");
                }
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
            socket.on("newMessage", async (message:any) => {
                if(message.sender._id === useCurrentUserStore.getState().selectedUser._id){
                set({ messages: [...get().messages, message] });
                }else{
                    console.log("new message from another user");
      
                    
                }
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