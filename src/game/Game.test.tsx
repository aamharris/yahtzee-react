import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import Game from ".";

describe("Game", () => {
  describe("rounds", () => {
    it("sets initial round to 1", () => {
      render(<Game />);
      expect(screen.getByText("Round 1 / 13")).toBeInTheDocument();
    });

    it("sets next round when a score is selected and dice is rolled again", () => {
      render(<Game />);
      fireEvent.click(screen.getByRole("button", { name: "Roll" }));
      fireEvent.click(within(screen.getByRole("row", { name: /Aces/ })).getByText(/^\d$/));
      fireEvent.click(screen.getByRole("button", { name: "Roll" }));
      expect(screen.getByText("Round 2 / 13")).toBeInTheDocument();
    });
  });
});
