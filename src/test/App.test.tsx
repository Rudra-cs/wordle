import { render, screen } from "./test-utils";
import { describe, expect, it } from "vitest";
import App from "../App";

describe("Simple Working Test", () => {
    it("the title is visible", () => {
        render(<App />);
        expect(screen.getByText(/Wordle/i)).toBeInTheDocument();
    });
});
