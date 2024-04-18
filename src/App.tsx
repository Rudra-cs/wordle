import { useState } from "react";
import WordRow from "./components/WordRow";
import { useStore } from "./store/store";
import { GUESS_LENGTH, LETTER_LENGTH } from "./utils/word-utils";

const App = () => {
    const state = useStore();
    const [guess, setGuess] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newGuess = e.target.value;

        if (newGuess.length === LETTER_LENGTH) {
            state.addGuess(newGuess);
            setGuess("");
            return;
        }
        setGuess(newGuess);
    };

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
                <div>
                    <input
                        type="text"
                        className="w-1/2 p-2 border-b border-gray-500"
                        value={guess}
                        onChange={onChange}
                        disabled={isGameOver}
                    />
                </div>
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

export default App;
