import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import WordRow from "./components/WordRow";
import { useStore } from "./store/store";
import { GUESS_LENGTH, LETTER_LENGTH } from "./utils/word-utils";

const App = () => {
    const state = useStore();
    const [guess, setGuess] = useGuess();

    let rows = [...state.rows];
    if (rows.length < GUESS_LENGTH) {
        rows.push({ guess });
    }
    const numberOfGuessRemaining = GUESS_LENGTH - rows.length;
    rows = rows.concat(Array(numberOfGuessRemaining).fill(""));

    const isGameOver = state.gameState != "playing";

    return (
        <div className="mx-auto w-96 relative">
            <header className="border-b border-gray-500 pb-2 mb-2">
                <h1 className="text-center text-4xl mt-3">Wordle</h1>
            </header>

            <main className="grid grid-rows-6 gap-2 ">
                {rows.map(({ guess, result }, index) => (
                    <WordRow key={index} letters={guess} result={result} />
                ))}
            </main>

            {isGameOver && (
                <div
                    role="modal"
                    className="absolute bg-white left-0 right-0 top-1/4 p-6 w-3/4 
                    mx-auto rounded-lg border border-gray-500 text-center"
                >
                    Game Over!
                    <button
                        className="border block rounded border-green-500 bg-green-500 p-2 mt-4 mx-auto"
                        onClick={() => {
                            state.newGame();
                            setGuess("");
                        }}
                    >
                        New Game
                    </button>
                </div>
            )}
        </div>
    );
};

function useGuess(): [string, React.Dispatch<React.SetStateAction<string>>] {
    const addGuess = useStore((s) => s.addGuess);
    const [guess, setGuess] = useState("");
    const previousGuess = usePrevious(guess);

    const onKeyDown = (e: KeyboardEvent) => {
        const letter = e.key;
        if (
            /^[a-zA-Z]$/.test(letter) ||
            letter === "Backspace" ||
            letter === "Enter"
        ) {
            setGuess((curGuess) => {
                const newGuess =
                    letter.length === 1 ? curGuess + letter : curGuess;
                switch (letter) {
                    case "Backspace":
                        return newGuess.slice(0, -1);
                    case "Enter":
                        if (newGuess.length === LETTER_LENGTH) {
                            return "";
                        }
                }
                if (curGuess.length === LETTER_LENGTH) {
                    return curGuess;
                }
                return newGuess;
            });
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    });

    useEffect(() => {
        if (guess.length === 0 && previousGuess?.length === LETTER_LENGTH) {
            addGuess(previousGuess);
        }
    }, [addGuess, guess, previousGuess]);
    return [guess, setGuess];
}

// source https://usehooks.com/usePrevious/
function usePrevious<T>(value: T): T | undefined {
    const ref: MutableRefObject<T | undefined> = useRef<T>();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

export default App;
