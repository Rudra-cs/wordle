import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { getRandomWord } from "../utils/word-utils";

type StoreState = {
    answer: string;
    guesses: string[];
    addGuess: (guess: string) => void;
};

export const useStore = create<StoreState>()(
    devtools(
        persist(
            (set) => ({
                answer: getRandomWord(),
                guesses: ["hello", "sunny", "penny", "liver"],
                addGuess: (guess: string) => {
                    set((prevState) => ({
                        guesses: [...prevState.guesses, guess],
                    }));
                },
            }),
            {
                name: "wordle",
                storage: createJSONStorage(() => sessionStorage),
            }
        )
    )
);
