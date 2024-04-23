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
        <div
            className={` grid grid-cols-5 gap-1 w-[250px] sm:w-full mx-auto sm:gap-2 ${className} `}
        >
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
    const stateStyles =
        state == null ? "dark:bg-zinc-900" : characterStateStyles[state];
    return (
        <span
            className={`inline-block border-2 before:inline-block before:content-['_']
         border-gray-500 px-1 py-1 sm:p-4 uppercase font-bold text-2xl text-center rounded-lg ${stateStyles}  dark:text-white hover:scale-105
        `}
        >
            {value}
        </span>
    );
}

const characterStateStyles = {
    [LetterState.Miss]: "bg-slate-400 border-slate-400/50 dark:bg-gray-700",
    [LetterState.Present]:
        "bg-yellow-300 border-yellow-400/50 dark:bg-yellow-500/90",
    [LetterState.Match]: "bg-green-500 border-green-500/50 dark:bg-green-600",
};
