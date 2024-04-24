import { useStore } from "../store/store";
import { LetterState } from "../utils/word-utils";

const KeyBoard = ({
    onClick: onClickProp,
}: {
    onClick: (letter: string) => void;
}) => {
    const keyboardLetterState = useStore((s) => s.keyboardLetterState);
    //  on button click
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const letter = e.currentTarget.textContent;
        onClickProp(letter!);
    };

    return (
        <div className="flex flex-col mt-5 justify-center w-full">
            {keyboardKeys.map((keyboardRow, rowIndex) => {
                return (
                    <div
                        key={rowIndex}
                        className="flex justify-center my-1 space-x-2 "
                    >
                        {keyboardRow.map((key, index) => {
                            let styles =
                                "rounded  font-bold uppercase py-2 px-2 text-xs sm:text-lg sm:px-4 flex-1 select-none hover:scale-105 dark:text-white";
                            const letterState =
                                keyStateStyles[keyboardLetterState[key]];

                            if (key === "") {
                                styles += " pointer-events-none";
                            }

                            if (letterState) {
                                styles += `${letterState}`;
                            } else if (key !== "") {
                                styles += " bg-slate-200 dark:bg-[#656780]";
                            }

                            return (
                                <button
                                    className={styles}
                                    key={index}
                                    onClick={onClick}
                                >
                                    {key}
                                </button>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

const keyboardKeys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

const keyStateStyles = {
    [LetterState.Miss]: " bg-slate-400 dark:bg-gray-800 ",
    [LetterState.Present]: " bg-yellow-300 dark:bg-yellow-500/90",
    [LetterState.Match]: " bg-green-400 dark:bg-green-600",
};

export default KeyBoard;
