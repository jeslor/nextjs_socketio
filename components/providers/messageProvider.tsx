"use client";
import { create } from 'zustand';
import {useCurrentUserStore} from  '@/components/providers/userProvider'
import { getMessages } from '@/lib/actions/message.actions';

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

    }
    }));