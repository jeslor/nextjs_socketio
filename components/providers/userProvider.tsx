"use cleint";
import { getCurrentUser, getOtherUsers } from '@/lib/actions/user.actions';
import { signOut, useSession } from 'next-auth/react';
import { create } from 'zustand';


interface UserStore {
  currentUser: any | null;
  contacts: any[];
  selectedUser: any | null;
  isLoadingCurrentUser: boolean;
  isLoadingContacts: boolean;
  setCurrentUser: (user: any) => void;
  setContacts: (userId: string) => Promise<void>;
  setSelectedUser: (user: any) => void;
  logoutUser: () => Promise<void>;
}



export const useCurrentUserStore = create<UserStore>((set,get) => ({
  currentUser: null,
  contacts: [],
  selectedUser: null,
  isLoadingCurrentUser: false,
  isLoadingContacts: false,

  setCurrentUser: async (email) => {
    set({ isLoadingCurrentUser: true });
    const currentUser = await getCurrentUser(email);
    if(currentUser){
      set({ currentUser: currentUser.data });
    }
    set({ isLoadingCurrentUser: false });
  },

  setContacts:   async (currentUserId:any) => {
    set({ isLoadingContacts: true });
    const contacts:any = await getOtherUsers(currentUserId);
    if(contacts){
      set({ contacts: contacts.data });
    }
    set({ isLoadingContacts: false });
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  logoutUser: async () => {
    await signOut({ callbackUrl: '/login' });
    set({
      currentUser: null,
      contacts: [],
      selectedUser: null,
    });
  },
}));
