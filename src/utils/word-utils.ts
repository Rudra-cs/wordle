import wordBank from "../word-bank.json";

// const word = getRandomWord();

export const LETTER_LENGTH = 5;
export const GUESS_LENGTH = 6;

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    return wordBank[randomIndex];
}

export enum LetterState {
    Miss,
    Present,
    Match,
}

export function computeGuess(
    guess: string,
    answerString: string
): LetterState[] {
    const result: LetterState[] = [];

    if (guess.length !== answerString.length) {
        return result;
    }

    const guessArray = guess.split("");
    const answer = answerString.split("");

    const answerLetterCount: Record<string, number> = {};

    guessArray.forEach((letter, index) => {
        const currentAnswerLetter = answer[index];

        answerLetterCount[currentAnswerLetter] = answerLetterCount[
            currentAnswerLetter
        ]
            ? answerLetterCount[currentAnswerLetter] + 1
            : 1;

        if (letter === currentAnswerLetter) {
            result.push(LetterState.Match);
        } else if (answer.includes(letter)) {
            result.push(LetterState.Present);
        } else {
            result.push(LetterState.Miss);
        }
    });

    result.forEach((curResult, resultIndex) => {
        if (curResult !== LetterState.Present) {
            return;
        }

        const guessLetter = guessArray[resultIndex];

        answer.forEach((currentAnswerLetter, answerIndex) => {
            if (currentAnswerLetter !== guessLetter) {
                return;
            }

            if (result[answerIndex] === LetterState.Match) {
                result[resultIndex] = LetterState.Miss;
            }

            if (answerLetterCount[guessLetter] <= 0) {
                result[resultIndex] = LetterState.Miss;
            }
        });
        answerLetterCount[guessLetter]--;
    });
    return result;
}

export function isValidWord(word: string): boolean {
    return wordBank.includes(word);
}
