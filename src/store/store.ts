import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import {
    computeGuess,
    getRandomWord,
    GUESS_LENGTH,
    LetterState,
} from "../utils/word-utils";

type GuessRow = {
    guess: string;
    result?: LetterState[];
};

type StoreState = {
    answer: string;
    rows: GuessRow[];
    gameState: "playing" | "won" | "lost";
    addGuess: (guess: string) => void;
    newGame: (initialGuess?: string[]) => void;
};

export const useStore = create<StoreState>()(
    devtools(
        persist(
            (set, get) => {
                function addGuess(guess: string) {
                    const result = computeGuess(guess, get().answer);
                    const didWin = result.every((i) => i === LetterState.Match);
                    const rows = [
                        ...get().rows,
                        {
                            guess,
                            result,
                        },
                    ];
                    set(() => ({
                        rows,
                        gameState: didWin
                            ? "won"
                            : rows.length === GUESS_LENGTH
                            ? "lost"
                            : "playing",
                    }));
                }
                return {
                    answer: getRandomWord(),
                    rows: [],
                    gameState: "playing",
                    addGuess,
                    newGame: (initialRows = []) => {
                        set({
                            answer: getRandomWord(),
                            rows: [],
                            gameState: "playing",
                        });

                        initialRows.forEach(addGuess);
                    },
                };
            },
            {
                name: "wordle",
                storage: createJSONStorage(() => sessionStorage),
            }
        )
    )
);

// useStore.persist.clearStorage();
