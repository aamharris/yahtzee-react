import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import Game from "./Game";

describe("Game", () => {
  it("sets initial dice to empty values", () => {
    render(<Game />);
    expect(screen.getByTestId("dice-0").innerHTML).toContain("-");
    expect(screen.getByTestId("dice-1").innerHTML).toContain("-");
    expect(screen.getByTestId("dice-2").innerHTML).toContain("-");
    expect(screen.getByTestId("dice-3").innerHTML).toContain("-");
    expect(screen.getByTestId("dice-4").innerHTML).toContain("-");
  });

  it("rolls dice when roll dice button is clicked", () => {
    render(<Game />);
    fireEvent.click(screen.getByRole("button", { name: "Roll" }));
    expect(screen.getByTestId("dice-0").innerHTML).toMatch(/^\d$/);
    expect(screen.getByTestId("dice-1").innerHTML).toMatch(/^\d$/);
    expect(screen.getByTestId("dice-2").innerHTML).toMatch(/^\d$/);
    expect(screen.getByTestId("dice-3").innerHTML).toMatch(/^\d$/);
    expect(screen.getByTestId("dice-4").innerHTML).toMatch(/^\d$/);
  });

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
