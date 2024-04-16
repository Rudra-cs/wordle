import { useStore } from "../store/store";
import { computeGuess, LETTER_LENGTH, LetterState } from "../utils/word-utils";

interface WordRowProps {
    letters: string;
}

const WordRow = ({ letters: lettersProp = "" }: WordRowProps) => {
    const answer = useStore((state) => state.answer);
    const lettersRemaining = LETTER_LENGTH - lettersProp.length;
    const letters = lettersProp
        .split("")
        .concat(Array(lettersRemaining).fill(""));

    const guessStates = computeGuess(lettersProp, answer);
    return (
        <div className="grid grid-cols-5 gap-2">
            {letters.map((char, index) => (
                <CharacterBox
                    key={char + index}
                    value={char}
                    state={guessStates[index]}
                />
            ))}
        </div>
    );
};

export default WordRow;

interface CharacterBoxProps {
    value: string;
    state?: LetterState;
}

function CharacterBox({ value, state }: CharacterBoxProps) {
    const stateStyles = state == null ? "" : characterStateStyles[state];
    return (
        <div
            className={`inline-block border-2
         border-gray-500 p-4 uppercase font-bold text-2xl text-center rounded-lg ${stateStyles}`}
        >
            {value}
        </div>
    );
}

const characterStateStyles = {
    [LetterState.Miss]: "bg-gray-400 border-gray-400 ",
    [LetterState.Present]: "bg-yellow-400 border-yellow-400",
    [LetterState.Match]: "bg-green-500 border-green-500",
};
