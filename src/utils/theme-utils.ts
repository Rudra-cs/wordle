// useTheme.ts
import { useEffect } from "react";
import { useThemeStore } from "../store/theme-store";

const useTheme = (): [string, () => void] => {
    const { choosenTheme, toggleTheme } = useThemeStore((state) => ({
        choosenTheme: state.choosenTheme,
        toggleTheme: state.toggleTheme,
    }));

    useEffect(() => {
        const root = window.document.documentElement;
        if (choosenTheme === "dark") {
            root.classList.remove("light");
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
            root.classList.add("light");
        }
        localStorage.setItem("theme", choosenTheme);
    }, [choosenTheme]);

    const handleToggleTheme = () => {
        toggleTheme(); // Call toggleTheme only when the user interacts with UI
    };

    return [choosenTheme, handleToggleTheme];
};

export default useTheme;
