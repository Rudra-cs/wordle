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
    keyboardLetterState: { [letter: string]: LetterState };
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

                    const keyboardLetterState = get().keyboardLetterState;
                    result.forEach((r, index) => {
                        const resultGuessLetter = guess[index];

                        const currentLetterState =
                            keyboardLetterState[resultGuessLetter];

                        switch (currentLetterState) {
                            case LetterState.Match:
                                break;
                            case LetterState.Present:
                                if (r === LetterState.Miss) {
                                    break;
                                }
                                break;
                            default:
                                keyboardLetterState[resultGuessLetter] = r;
                                break;
                        }
                    });
                    set(() => ({
                        rows,
                        keyboardLetterState,
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
                    keyboardLetterState: {},
                    gameState: "playing",
                    addGuess,
                    newGame: (initialRows = []) => {
                        set({
                            answer: getRandomWord(),
                            rows: [],
                            keyboardLetterState: {},
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
