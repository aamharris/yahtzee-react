import React from "react";
import { render, screen, within } from "@testing-library/react";
import Dice from "./Dice";
import DiceBuilder from "../testUtils/DiceBuilder";
import { YahtzeeDice } from "../shared/types/yahtzeeDice";

describe("Dice", () => {
  const renderDiceContainer = (dice: YahtzeeDice[]) => {
    render(<Dice dice={dice} onDiceClicked={jest.fn()} />);
  };

  it("gets the correct dice image for the value", () => {
    var diceBuilder = new DiceBuilder();
    for (var i = 1; i <= 6; i++) {
      diceBuilder.addDice({ value: i, id: i });
    }

    const dice = diceBuilder.build();

    renderDiceContainer(dice);
    expect(within(screen.getByTestId("dice-1")).getByAltText("1")).toBeInTheDocument();
    expect(within(screen.getByTestId("dice-2")).getByAltText("2")).toBeInTheDocument();
    expect(within(screen.getByTestId("dice-3")).getByAltText("3")).toBeInTheDocument();
    expect(within(screen.getByTestId("dice-4")).getByAltText("4")).toBeInTheDocument();
    expect(within(screen.getByTestId("dice-5")).getByAltText("5")).toBeInTheDocument();
    expect(within(screen.getByTestId("dice-6")).getByAltText("6")).toBeInTheDocument();
  });

  it("does not display dice when dice value is undefined", () => {
    const dice: YahtzeeDice[] = [{ id: 1, value: undefined, isLocked: false }];

    renderDiceContainer(dice);
    expect(screen.getByTestId("dice-1")).toBeEmptyDOMElement();
  });

  it("adds locked class when dice is locked", () => {
    const dice: YahtzeeDice[] = [{ id: 1, value: 1, isLocked: true }];

    renderDiceContainer(dice);
    expect(screen.getByTestId("dice-1")).toHaveClass("locked");
  });

  it("does not have locked style class when dice is not locked", () => {
    const dice: YahtzeeDice[] = [{ id: 1, value: 1, isLocked: false }];

    renderDiceContainer(dice);
    expect(screen.getByTestId("dice-1")).not.toHaveClass("locked");
  });
});
