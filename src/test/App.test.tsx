import { render, screen, userEvent } from "./test-utils";
import { describe, expect, it } from "vitest";
import App from "../App";
import { useStore } from "../store/store";

describe("Simple Working Test", () => {
    it("the title is visible", () => {
        render(<App />);
        expect(screen.getByText(/Wordle/i)).toBeInTheDocument();
    });

    it("shows empty state", () => {
        useStore.getState().newGame([]);
        render(<App />);
        expect(screen.queryByText("Game Over")).toBeNull();
        expect(document.querySelectorAll("main div")).toHaveLength(6);
        expect(document.querySelector("main")?.textContent).toEqual("");
    });

    it("shows one row of guesses", () => {
        useStore.getState().newGame(["hello"]);
        render(<App />);
        expect(document.querySelector("main")?.textContent).toEqual("hello");
    });

    it("shows lost game over state", () => {
        useStore.getState().newGame(Array(6).fill("hello"));
        render(<App />);
        // expect(document.querySelector("main")?.textContent).toEqual("hello");
        expect(screen.getByText("Game Over!")).toBeInTheDocument();
    });

    it("shows won game over state", () => {
        useStore.getState().newGame(Array(2).fill("hello"));
        const answer = useStore.getState().answer;
        useStore.getState().addGuess(answer);
        render(<App />);
        // expect(document.querySelector("main")?.textContent).toEqual("hello");
        expect(screen.getByText("Game Over!")).toBeInTheDocument();
    });

    it("can start new game", async () => {
        useStore.getState().newGame(Array(6).fill("hello"));
        render(<App />);
        // expect(document.querySelector("main")?.textContent).toEqual("hello");
        expect(screen.getByText("Game Over!")).toBeInTheDocument();
        userEvent.click(screen.getByText("New Game"));
        await new Promise((resolve) => setTimeout(resolve, 200));
        expect(document.querySelector("main")?.textContent).toEqual("");
    });
});
