import { describe, expect, it } from "vitest";
import {
    computeGuess,
    getRandomWord,
    isValidWord,
    LetterState,
} from "../utils/word-utils";

describe("getRandomWord", () => {
    it("random word", () => {
        expect(getRandomWord()).toBeTruthy();
        expect(getRandomWord().length).toEqual(5);
    });
});

describe("computeGuess", () => {
    it("works with match and present", () => {
        expect(computeGuess("boost", "basic")).toEqual([
            LetterState.Match,
            LetterState.Miss,
            LetterState.Miss,
            LetterState.Present,
            LetterState.Miss,
        ]);
    });

    it("works with all matches", () => {
        expect(computeGuess("boost", "boost")).toEqual([
            LetterState.Match,
            LetterState.Match,
            LetterState.Match,
            LetterState.Match,
            LetterState.Match,
        ]);
    });

    it("works with full miss", () => {
        expect(computeGuess("boost", "rider")).toEqual([
            LetterState.Miss,
            LetterState.Miss,
            LetterState.Miss,
            LetterState.Miss,
            LetterState.Miss,
        ]);
    });

    it("only does one match when two letters are present", () => {
        expect(computeGuess("solid", "boost")).toEqual([
            LetterState.Present,
            LetterState.Match,
            LetterState.Miss,
            LetterState.Miss,
            LetterState.Miss,
        ]);
    });

    it("when 2 letters are present but answer has only 1 of those", () => {
        expect(computeGuess("allol", "smelt")).toEqual([
            LetterState.Miss,
            LetterState.Present,
            LetterState.Miss,
            LetterState.Miss,
            LetterState.Miss,
        ]);
    });

    it("returns empty array when given incomplete guess", () => {
        expect(computeGuess("so", "boost")).toEqual([]);
    });

    it("when 1 letter matches but guess has more of the same letter", () => {
        expect(computeGuess("allol", "colon")).toEqual([
            LetterState.Miss,
            LetterState.Miss,
            LetterState.Match,
            LetterState.Match,
            LetterState.Miss,
        ]);
    });
});

describe("isValidWord", () => {
    it("it works with a valid word", () => {
        expect(isValidWord("boost")).toBe(true);
    });

    it("it works with a invalid word", () => {
        expect(isValidWord("abcde")).toBe(false);
    });
});
