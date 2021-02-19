import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import RollContainer from ".";

describe("Roll Container", () => {
  it("shows current roll count", () => {
    render(<RollContainer currentRollCount={1} onRollClicked={jest.fn} canRollDice={true} />);
    expect(screen.getByText("Roll 1 / 3")).toBeInTheDocument();
  });

  it("hides the roll count when roll count is reset", () => {
    render(<RollContainer currentRollCount={0} onRollClicked={jest.fn} canRollDice={true} />);
    expect(screen.queryByText("Roll 0 / 3")).not.toBeVisible();
  });

  it("roll dice button is disabled when canRollDice is false", () => {
    render(<RollContainer currentRollCount={1} onRollClicked={jest.fn} canRollDice={false} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("roll dice button is enabled when canRollDice is true", () => {
    render(<RollContainer currentRollCount={1} onRollClicked={jest.fn} canRollDice={true} />);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("calls onRollClicked when roll dice button is clicked", () => {
    const rollDiceCalled = jest.fn();
    render(<RollContainer currentRollCount={1} onRollClicked={rollDiceCalled} canRollDice={true} />);
    fireEvent.click(screen.getByRole("button"));
    expect(rollDiceCalled).toHaveBeenCalledTimes(1);
  });
});
