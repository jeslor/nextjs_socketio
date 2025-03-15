import { signOut } from 'next-auth/react';
import { create } from 'zustand';

export const useCurrentUserStore = create<any>((set) => ({
  currentUser: null,
  setCurrentUser: (session:any) => {
    set({ currentUser: session?.user });
  },
  logoutUser: async () => {
    await signOut(
      {
        callbackUrl: '/login',
      },
    );

  },
}));
