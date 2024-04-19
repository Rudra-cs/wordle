import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import WordRow from "./components/WordRow";
import { useStore } from "./store/store";
import { GUESS_LENGTH, isValidWord, LETTER_LENGTH } from "./utils/word-utils";
import KeyBoard from "./components/KeyBoard";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

const App = () => {
    const state = useStore();
    const [guess, setGuess, addGuessLetter] = useGuess();
    const addGuess = useStore((s) => s.addGuess);
    const previousGuess = usePrevious(guess);
    const [showInvalidGuess, setShowInvalidGuess] = useState(false);

    useEffect(() => {
        if (guess.length === 0 && previousGuess?.length === LETTER_LENGTH) {
            if (isValidWord(previousGuess)) {
                addGuess(previousGuess);
                setShowInvalidGuess(false);
            } else {
                setShowInvalidGuess(true);
                setGuess(previousGuess);
            }
        }
    }, [addGuess, guess, previousGuess, setGuess]);

    useEffect(() => {
        let id: ReturnType<typeof setTimeout>;
        if (showInvalidGuess === true) {
            id = setTimeout(() => setShowInvalidGuess(false), 2000);
        }
        return () => clearTimeout(id);
    }, [showInvalidGuess]);

    let rows = [...state.rows];
    let currentRow = 0;
    if (rows.length < GUESS_LENGTH) {
        currentRow = rows.push({ guess }) - 1;
    }
    const numberOfGuessRemaining = GUESS_LENGTH - rows.length;
    rows = rows.concat(Array(numberOfGuessRemaining).fill(""));

    const isGameOver = state.gameState != "playing";

    return (
        <div className="mx-auto w-96 relative">
            <header className="border-b border-gray-500 pb-2 mb-2">
                <h1 className="text-center text-5xl mt-3 font-mono font-bold">
                    Wordle
                </h1>
            </header>

            <main className="grid grid-rows-6 gap-2 ">
                {rows.map(({ guess, result }, index) => (
                    <WordRow
                        key={index}
                        letters={guess}
                        result={result}
                        className={`${
                            showInvalidGuess && currentRow === index
                                ? "animate-bounce"
                                : ""
                        }       
                        `}
                    />
                ))}
            </main>

            <KeyBoard
                onClick={(letter) => {
                    addGuessLetter(letter);
                }}
            />

            {/* {isGameOver && (
                <div
                    role="modal"
                    className="absolute bg-white left-0 right-0 top-1/4 p-6 w-3/4 
                    mx-auto rounded-lg border border-gray-500 text-center"
                >
                    Game Over!
                    <WordRow className={``} letters={state.answer} />
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
            )} */}

            {showInvalidGuess && (
                <div
                    role="modal"
                    className="absolute bg-slate-300 left-0 right-0 top-1/4 p-6 w-3/4 
               mx-auto rounded-lg border border-slate-500 text-center font-mono text-lg"
                >
                    Invalid word!!
                </div>
            )}

            {isGameOver && (
                <div
                    role="modal"
                    className={`fixed inset-0 z-10 flex items-center justify-center`}
                    onClick={() => {
                        // Close the modal when the background overlay is clicked
                        state.newGame();
                        setGuess("");
                    }}
                >
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div
                        className="absolute bg-slate-200 p-6 w-1/2 mx-auto rounded-lg border border-gray-500 text-center font-mono text-xl"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent the click event from propagating to the parent div
                        }}
                    >
                        <div className="bg-slate-400 rounded-lg p-2">
                            {state.gameState === "won"
                                ? "You Won!!!🎉"
                                : "You Lost~😝"}
                            {state.gameState === "won" ? (
                                <Fireworks
                                    autorun={{ speed: 3, duration: 2000 }}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                        <p className="mt-5">The answer was:</p>
                        <WordRow className="" letters={state.answer} />

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
                </div>
            )}
            <div className="w-full bg-slate-200 rounded-lg font-mono text-lg mt-10 flex flex-col justify-center items-center align-bottom bottom-0 select-none">
                Made with 🧠 by Rudra Behera.
            </div>
        </div>
    );
};

function useGuess(): [
    string,
    React.Dispatch<React.SetStateAction<string>>,
    (letter: string) => void
] {
    const [guess, setGuess] = useState("");

    const addGuessLetter = (letter: string) => {
        setGuess((curGuess) => {
            const newGuess = letter.length === 1 ? curGuess + letter : curGuess;
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
    };

    const onKeyDown = (e: KeyboardEvent) => {
        const letter = e.key;
        if (
            /^[a-zA-Z]$/.test(letter) ||
            letter === "Backspace" ||
            letter === "Enter"
        ) {
            addGuessLetter(letter);
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    });

    return [guess, setGuess, addGuessLetter];
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
