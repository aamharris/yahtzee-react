import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import Game from ".";
import ScoringCategories from "../scorecard/scoringCategories";

describe("Game", () => {
  it("initializes with 5 empty dice", () => {
    render(<Game />);
    expect(screen.getByTestId("dice-0")).toBeEmptyDOMElement();
    expect(screen.getByTestId("dice-1")).toBeEmptyDOMElement();
    expect(screen.getByTestId("dice-2")).toBeEmptyDOMElement();
    expect(screen.getByTestId("dice-3")).toBeEmptyDOMElement();
    expect(screen.getByTestId("dice-4")).toBeEmptyDOMElement();
  });

  it("initializes with empty scorecard", () => {
    render(<Game />);
    for (const category of Object.values(ScoringCategories)) {
      expect(screen.getByRole("row", { name: category })).toBeInTheDocument();
    }
  });

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

  it("resets roll count when score is selected", () => {
    render(<Game />);
    fireEvent.click(screen.getByRole("button", { name: "Roll" }));
    fireEvent.click(within(screen.getByRole("row", { name: /Aces/ })).getByText(/^\d$/));
    fireEvent.click(screen.getByRole("button", { name: "Roll" }));
    expect(screen.getByText("Roll 1 / 3")).toBeInTheDocument();
  });
});
