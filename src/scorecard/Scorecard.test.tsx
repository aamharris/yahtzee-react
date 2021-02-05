import React from "react";
import { act, findByRole, fireEvent, render, screen, waitFor, waitForElement, within } from "@testing-library/react";
import Scorecard from ".";
import { YahtzeeDice } from "../Game";
import { FULL_HOUSE_SCORE, LG_STRAIGHT_SCORE, SM_STRAIGHT_SCORE, YAHTZEE_SCORE } from "../constants";
import { createNewScorecard } from "./scorecardManager";

describe("Scorecard", () => {
  class DiceBuilder {
    dice: YahtzeeDice[];

    constructor() {
      this.dice = [];
    }

    addDice = (dice: Partial<YahtzeeDice>, quantity: number = 1) => {
      this.dice = this.dice.concat(new Array<YahtzeeDice>(quantity).fill(dice as YahtzeeDice));
      return this;
    };

    build = (): YahtzeeDice[] => {
      return this.dice;
    };
  }

  const renderScorecard = (dice: YahtzeeDice[]) => {
    const defaultScorecard = createNewScorecard();
    const { rerender } = render(
      <Scorecard
        dice={dice}
        onScoreMarked={jest.fn}
        canSelectScore={true}
        onScorecardChanged={jest.fn}
        scorecard={defaultScorecard}
      />
    );
    // Because the logic for updating the scorecard is in the useEffect hook,
    // this has to be rerendered.
    // See https://github.com/testing-library/react-testing-library/issues/215
    rerender(
      <Scorecard
        dice={dice}
        onScoreMarked={jest.fn}
        canSelectScore={true}
        onScorecardChanged={jest.fn}
        scorecard={defaultScorecard}
      />
    );
  };

  it("calculates the total for aces", () => {
    const dice = new DiceBuilder().addDice({ value: 1 }, 2).build();
    renderScorecard(dice);

    expect(screen.getByRole("row", { name: /Aces 2/ }));
  });

  it("calculates the total for twos", () => {
    const dice = new DiceBuilder().addDice({ value: 2 }, 2).build();
    renderScorecard(dice);

    expect(screen.getByRole("row", { name: /Twos 4/ }));
  });

  it("calculates the total for threes", () => {
    const dice = new DiceBuilder().addDice({ value: 3 }, 2).build();
    renderScorecard(dice);

    expect(screen.getByRole("row", { name: /Threes 6/ }));
  });

  it("calculates the total for fours", () => {
    const dice = new DiceBuilder().addDice({ value: 4 }, 2).build();
    renderScorecard(dice);

    expect(screen.getByRole("row", { name: /Fours 8/ }));
  });

  it("calculates the total for fives", () => {
    const dice = new DiceBuilder().addDice({ value: 5 }, 2).build();
    renderScorecard(dice);

    expect(screen.getByRole("row", { name: /Fives 10/ }));
  });

  it("calculates the total for sixes", () => {
    const dice = new DiceBuilder().addDice({ value: 6 }, 2).build();
    renderScorecard(dice);

    expect(screen.getByRole("row", { name: /Sixes 12/ }));
  });

  it("calculates total when full house", () => {
    const dice = new DiceBuilder().addDice({ value: 6 }, 3).addDice({ value: 5 }, 2).build();
    renderScorecard(dice);

    expect(within(screen.getByRole("row", { name: /Full House/ })).getByText(FULL_HOUSE_SCORE));
  });

  it("shows total for three of a kind when three of a kind is rolled", () => {
    const dice = new DiceBuilder().addDice({ value: 3 }, 3).addDice({ value: 4 }).addDice({ value: 1 }).build();
    renderScorecard(dice);

    expect(within(screen.getByRole("row", { name: /3 of a Kind/i })).getByText(14));
  });

  it("shows total for four of a kind when rolled", () => {
    const dice = new DiceBuilder().addDice({ value: 3 }, 4).addDice({ value: 4 }).build();
    renderScorecard(dice);
    expect(within(screen.getByRole("row", { name: /4 of a Kind/i })).getByText(16));
  });

  it("shows yahtzee score when yahtzee is rolled", () => {
    const dice = new DiceBuilder().addDice({ value: 3 }, 5).build();
    renderScorecard(dice);

    expect(screen.getByRole("row", { name: `YAHTZEE ${YAHTZEE_SCORE}` }));
  });

  it("shows total for lg straight when lg straight is rolled", () => {
    const dice = new DiceBuilder()
      .addDice({ value: 1 })
      .addDice({ value: 2 })
      .addDice({ value: 3 })
      .addDice({ value: 4 })
      .addDice({ value: 5 })
      .build();
    renderScorecard(dice);

    expect(within(screen.getByRole("row", { name: /Lg. Straight/i })).getByText(LG_STRAIGHT_SCORE));
  });

  it("shows total for sm straight when roll has sm straight", () => {
    const dice = new DiceBuilder()
      .addDice({ value: 1 })
      .addDice({ value: 2 })
      .addDice({ value: 3 })
      .addDice({ value: 4 })
      .addDice({ value: 6 })
      .build();
    renderScorecard(dice);

    expect(within(screen.getByRole("row", { name: /Sm. Straight/ })).getByText(SM_STRAIGHT_SCORE));
  });

  it("shows dice total for chance", () => {
    const dice = new DiceBuilder().addDice({ value: 2 }, 2).addDice({ value: 3 }, 2).addDice({ value: 1 }).build();
    renderScorecard(dice);

    expect(screen.getByRole("row", { name: "Chance 11" }));
  });
});
