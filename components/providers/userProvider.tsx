import { getCurrentUser } from '@/lib/actions/user.actions';
import { signOut } from 'next-auth/react';
import { create } from 'zustand';

export const useCurrentUserStore = create<any>((set) => ({
  currentUser: null,

  setCurrentUser: async (email: string) => {
    const currUser = await getCurrentUser(email);
    console.log(currUser);
    
    set({ currentUser: currUser });
  },

  logoutUser: async () => {
    await signOut(
      {
        callbackUrl: '/login',
      },
    );

  },
}));
