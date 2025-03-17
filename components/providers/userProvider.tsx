"use client";
import { getCurrentUser, getOtherUsers } from '@/lib/actions/user.actions';
import {io} from 'socket.io-client';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { create } from 'zustand';

interface UserStore {
  currentUser: any | null;
  contacts: any[];
  selectedUser: any | null;
  isLoadingCurrentUser: boolean;
  isLoadingContacts: boolean;
  mySocket: any | null;
  onlineContacts: any[];
  setCurrentUser: (email: string) => Promise<void>;
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
  isLoadingContacts: false,
  mySocket: null,
  onlineContacts: [],

  setCurrentUser: async (email) => {    
    set({ isLoadingCurrentUser: true });
    const currentUser = await getCurrentUser(email);
    if (currentUser) {
      set({ currentUser: currentUser.data });
      get().connectToSocket(); // Connect to WebSocket after user is set
    }
    toast.success('Welcome back!');
    set({ isLoadingCurrentUser: false });
  },

  setContacts: async (currentUserId: any) => {
    set({ isLoadingContacts: true });
    const contacts: any = await getOtherUsers(currentUserId);
    if (contacts) {
      set({ contacts: contacts.data });
    }
    set({ isLoadingContacts: false });
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  logoutUser: async () => {
    await signOut({ callbackUrl: '/login' });
    get().disconnectFromSocket();
    set({
      currentUser: null,
      contacts: [],
      selectedUser: null,
    });
    toast.success('Logged out successfully');
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
