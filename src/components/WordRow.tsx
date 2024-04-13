const LETTER_LENGTH = 5;

interface WordRowProps {
    letters: string;
}

const WordRow = ({ letters: lettersProp = "" }: WordRowProps) => {
    const lettersRemaining = LETTER_LENGTH - lettersProp.length;
    const letters = lettersProp
        .split("")
        .concat(Array(lettersRemaining).fill(""));
    return (
        <div className="grid grid-cols-5 gap-1 my-1">
            {letters.map((char, index) => (
                <CharacterBox key={char + index} value={char} />
            ))}
        </div>
    );
};

export default WordRow;

interface CharacterBoxProps {
    value: string;
}

function CharacterBox({ value }: CharacterBoxProps) {
    return (
        <div className="inline-block text-center border-2 border-gray-500 p-4 uppercase font-bold text-2xl">
            {value}
        </div>
    );
}
