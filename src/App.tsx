import { useState } from "react";
import WordRow from "./components/WordRow";
import { useStore } from "./store/store";
import { LETTER_LENGTH } from "./utils/word-utils";

const GUESS_LENGTH = 6;

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

    let rows = [...state.guesses];
    if (rows.length < GUESS_LENGTH) {
        rows.push(guess);
    }
    const numberOfGuessRemaining = GUESS_LENGTH - rows.length;
    rows = rows.concat(Array(numberOfGuessRemaining).fill(""));

    return (
        <div className="mx-auto w-96">
            <header className="border-b border-gray-500 pb-2 mb-2">
                <h1 className="text-center text-4xl mt-3">Wordle</h1>
                <div>
                    <input
                        type="text"
                        className="w-1/2 p-2 border-b border-gray-500"
                        value={guess}
                        onChange={onChange}
                    />
                </div>
            </header>

            <main className="grid grid-rows-6 gap-2 ">
                {rows.map((word, index) => (
                    <WordRow key={index} letters={word} />
                ))}
            </main>
        </div>
    );
};

export default App;
