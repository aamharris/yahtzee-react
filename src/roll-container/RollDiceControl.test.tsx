import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import RollDiceControl from "./RollDiceControl";
import { MAX_ROLL_PER_ROUND } from "../constants";

describe("Roll Dice Control", () => {
  it("shows current roll count", () => {
    render(<RollDiceControl currentRollCount={1} onRollClicked={jest.fn} isGameOver={false} />);
    expect(screen.getByText("Roll 1 / 3")).toBeInTheDocument();
  });

  it("hides the roll count when roll count is reset", () => {
    render(<RollDiceControl currentRollCount={0} onRollClicked={jest.fn} isGameOver={false} />);
    expect(screen.queryByText("Roll 0 / 3")).not.toBeVisible();
  });

  it("roll dice button is disabled when roll count is equal to the max rolls per round", () => {
    render(<RollDiceControl currentRollCount={MAX_ROLL_PER_ROUND} onRollClicked={jest.fn} isGameOver={false} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("roll dice button is disabled when game is over", () => {
    render(<RollDiceControl currentRollCount={1} onRollClicked={jest.fn} isGameOver={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("roll dice button is enabled when game is not over and roll count is not max", () => {
    render(<RollDiceControl currentRollCount={1} onRollClicked={jest.fn} isGameOver={false} />);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("calls onRollClicked when roll dice button is clicked", () => {
    const rollDiceCalled = jest.fn();
    render(<RollDiceControl currentRollCount={1} onRollClicked={rollDiceCalled} isGameOver={false} />);
    fireEvent.click(screen.getByRole("button"));
    expect(rollDiceCalled).toHaveBeenCalledTimes(1);
  });
});
