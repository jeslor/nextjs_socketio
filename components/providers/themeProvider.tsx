import {create} from 'zustand';

interface ThemeStore {
    theme: string;
    setTheme: (theme: string) => void;
}


export const useThemeStore = create<ThemeStore>((set) => ({
    theme: 'dark',
    setTheme: (theme) => {
        
        set({theme});
        document.documentElement.setAttribute('data-theme', theme);
    },
}));