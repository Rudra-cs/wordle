import { create } from "zustand";

type ThemeStoreState = {
    choosenTheme: string;
    toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStoreState>((set) => ({
    choosenTheme: (() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            return storedTheme; // Use stored theme if available
        } else {
            return window.matchMedia("(prefers-color-scheme: light)").matches
                ? "light"
                : "dark";
        }
    })(),
    toggleTheme: () => {
        set((state) => ({
            choosenTheme: state.choosenTheme === "light" ? "dark" : "light",
        }));
    },
}));
