"use client";
import { getCurrentUser, getOtherUsers, updateUser } from '@/lib/actions/user.actions';
import {io} from 'socket.io-client';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { create } from 'zustand';

interface UserStore {
  currentUser: any | null;
  contacts: any[];
  selectedUser: any | null;
  isLoadingCurrentUser: boolean;
  isUpdatingTheme: boolean;
  isLoadingContacts: boolean;
  isSettingProfilePhoto: boolean;
  mySocket: any | null;
  onlineContacts: any[];
  setCurrentUser: (email: string) => Promise<void>;
  setUserTheme: (theme: string) => Promise<void>;
  setNewProfilePhoto: (profileImage:string) => Promise<void>;
  setContacts: (userId: string) => Promise<void>;
  setSelectedUser: (user: any) => void;
  logoutUser: () => Promise<void>;
  connectToSocket: () => void;
  disconnectFromSocket: () => void;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const useCurrentUserStore = create<UserStore>((set, get) => ({
  currentUser: null,
  contacts: [],
  selectedUser: null,
  isLoadingCurrentUser: false,
  isUpdatingTheme: false,
  isLoadingContacts: false,
  isSettingProfilePhoto: false,
  mySocket: null,
  onlineContacts: [],

  setCurrentUser: async(email:string) => {
   try {
    set({ isLoadingCurrentUser: true });
    const user  = await getCurrentUser(email);
    if (user) {
      set({ currentUser: user.data });
      get().connectToSocket(); // Connect to WebSocket after user is set
    }
    set({ isLoadingCurrentUser: false });
   } catch (error) {
    console.log(error);
    
   }
  },

  setUserTheme: async (theme:string) => {
   try {
    set({ isUpdatingTheme: true });
    const currentUser = get().currentUser;
    set({currentUser: {...currentUser, theme}});
    if (currentUser) {
      const updatedUser = await updateUser(currentUser._id, { theme });
      if (updatedUser.status === 200) {
        // alert('Theme updated successfully');
      }
    }
    set({ isUpdatingTheme: false });
   } catch (error) {
    console.log(error);
    
   }
  },

  setNewProfilePhoto: async (profileImage:string) => {
    try {
      set({ isSettingProfilePhoto: true });
      const currentUser = get().currentUser;
      if (currentUser) {
        const updatedUser = await updateUser(currentUser._id, { profileImage });
        if (updatedUser.status === 200) {
          set({ currentUser: updatedUser.data });
        }
      }
      set({ isSettingProfilePhoto: false });
    } catch (error) {
      console.log(error);
    } 
  },


  setContacts: async (currentUserId: string) => {
   try {
    set({ isLoadingContacts: true });
    const contacts: any = await getOtherUsers(currentUserId);
    if (contacts) {
      set({ contacts: contacts.data });
    }
    set({ isLoadingContacts: false });
   } catch (error) {
    console.log(error);
    
   }
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  logoutUser: async () => {
   try {
    await signOut({ callbackUrl: '/login' });
    get().disconnectFromSocket();
    set({
      currentUser: null,
      contacts: [],
      selectedUser: null,
    });
    toast.success('Logged out successfully');
   } catch (error) {
    console.log(error);
    
   }
  },

  connectToSocket: () => {
    const currentUser = get().currentUser;
    const existingSocket = get().mySocket;

    if (!currentUser || existingSocket) {
      console.log("User not set or already connected to WebSocket");
      return;
      
    }
    const socket = io(BASE_URL, {
      query: {
        userId: currentUser._id,
      },
    });
    socket.connect();
    console.log("WebSocket connected");
    set({ mySocket: socket });
    socket.on('connectedUsers', (data) => {
      set({ onlineContacts: data });
    }
    );
  },

  disconnectFromSocket: () => {
    const socket = get().mySocket;
    if (socket) {
      socket.disconnect();
      console.log("WebSocket disconnected");
      socket.on('connectedUsers', (data:any) => {
        set({ onlineContacts: data });
      });
      set({ mySocket: null });
    }
  },
}));
