import { LETTER_LENGTH, LetterState } from "../utils/word-utils";

interface WordRowProps {
    letters: string;
    result?: LetterState[];
    className?: string;
}

const WordRow = ({
    letters: lettersProp = "",
    result = [],
    className = "",
}: WordRowProps) => {
    const lettersRemaining = LETTER_LENGTH - lettersProp.length;
    const letters = lettersProp
        .split("")
        .concat(Array(lettersRemaining).fill(""));

    return (
        <div className={`grid grid-cols-5 gap-2 ${className}`}>
            {letters.map((char, index) => (
                <CharacterBox
                    key={char + index}
                    value={char}
                    state={result[index]}
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
        <span
            className={`inline-block border-2 before:inline-block before:content-['_']
         border-gray-500 p-4 uppercase font-bold text-2xl text-center rounded-lg ${stateStyles}`}
        >
            {value}
        </span>
    );
}

const characterStateStyles = {
    [LetterState.Miss]: "bg-gray-400 border-gray-400 ",
    [LetterState.Present]: "bg-yellow-400 border-yellow-400",
    [LetterState.Match]: "bg-green-500 border-green-500",
};
