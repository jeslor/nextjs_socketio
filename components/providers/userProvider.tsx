import { getCurrentUser, getOtherUsers } from '@/lib/actions/user.actions';
import { signOut } from 'next-auth/react';
import { create } from 'zustand';

export const useCurrentUserStore = create<any>((set,get) => ({
  currentUser: null,
  contacts: [],
  selectedUser: null,

  setCurrentUser: async (user:any) => {
    set({ currentUser: user});
  },
  setContacts: async (currentUser: any) => {
    console.log('user id', currentUser);
   const users = await getOtherUsers(currentUser._id);
   set({ contacts: users.data });
  },
  setSelectedUser: async (user: any) => {
    set({ selectedUser: user });
  },

  logoutUser: async () => {
    await signOut(
      {
        callbackUrl: '/login',
      },
    );

  },
}));
