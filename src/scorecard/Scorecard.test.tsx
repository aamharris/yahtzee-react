import React from "react";
import { render, screen } from "@testing-library/react";
import Scorecard, { YahtzeeScorecard2 } from ".";
import ScoringCategories from "./scoringCategories";
import createNewScorecard from "./scorecardManager";

describe("Scorecard", () => {
  const defaultScorecard = createNewScorecard();

  const renderScorecard = (scorecard: YahtzeeScorecard2) => {
    render(<Scorecard onScoreMarked={jest.fn} scorecard={scorecard} />);
  };

  it("displays the upper scorecard with scores", () => {
    const scorecard = {
      ...defaultScorecard,
      upperSection: [
        { category: ScoringCategories.aces, possibleScore: 1 },
        { category: ScoringCategories.twos, possibleScore: 2 },
        { category: ScoringCategories.threes, possibleScore: 3 },
        { category: ScoringCategories.fours, possibleScore: 4 },
        { category: ScoringCategories.fives, possibleScore: 5 },
        { category: ScoringCategories.sixes, possibleScore: 6 },
      ],
    };
    renderScorecard(scorecard);

    expect(screen.getByRole("row", { name: /Aces 1/ }));
    expect(screen.getByRole("row", { name: /Twos 2/ }));
    expect(screen.getByRole("row", { name: /Threes 3/ }));
    expect(screen.getByRole("row", { name: /Fours 4/ }));
    expect(screen.getByRole("row", { name: /Fives 5/ }));
    expect(screen.getByRole("row", { name: /Sixes 6/ }));
  });

  // it("calculates total when full house", () => {
  //   const dice = new DiceBuilder().addDice({ value: 6 }, 3).addDice({ value: 5 }, 2).build();
  //   renderScorecard(dice);

  //   expect(within(screen.getByRole("row", { name: /Full House/ })).getByText(FULL_HOUSE_SCORE));
  // });

  // it("shows total for three of a kind when three of a kind is rolled", () => {
  //   const dice = new DiceBuilder().addDice({ value: 3 }, 3).addDice({ value: 4 }).addDice({ value: 1 }).build();
  //   renderScorecard(dice);

  //   expect(within(screen.getByRole("row", { name: /3 of a Kind/i })).getByText(14));
  // });

  // it("shows total for four of a kind when rolled", () => {
  //   const dice = new DiceBuilder().addDice({ value: 3 }, 4).addDice({ value: 4 }).build();
  //   renderScorecard(dice);
  //   expect(within(screen.getByRole("row", { name: /4 of a Kind/i })).getByText(16));
  // });

  // it("shows yahtzee score when yahtzee is rolled", () => {
  //   const dice = new DiceBuilder().addDice({ value: 3 }, 5).build();
  //   renderScorecard(dice);

  //   expect(screen.getByRole("row", { name: `YAHTZEE ${YAHTZEE_SCORE}` }));
  // });

  // it("shows total for lg straight when lg straight is rolled", () => {
  //   const dice = new DiceBuilder()
  //     .addDice({ value: 1 })
  //     .addDice({ value: 2 })
  //     .addDice({ value: 3 })
  //     .addDice({ value: 4 })
  //     .addDice({ value: 5 })
  //     .build();
  //   renderScorecard(dice);

  //   expect(within(screen.getByRole("row", { name: /Lg. Straight/i })).getByText(LG_STRAIGHT_SCORE));
  // });

  // it("shows total for sm straight when roll has sm straight", () => {
  //   const dice = new DiceBuilder()
  //     .addDice({ value: 1 })
  //     .addDice({ value: 2 })
  //     .addDice({ value: 3 })
  //     .addDice({ value: 4 })
  //     .addDice({ value: 6 })
  //     .build();
  //   renderScorecard(dice);

  //   expect(within(screen.getByRole("row", { name: /Sm. Straight/ })).getByText(SM_STRAIGHT_SCORE));
  // });

  // it("shows dice total for chance", () => {
  //   const dice = new DiceBuilder().addDice({ value: 2 }, 2).addDice({ value: 3 }, 2).addDice({ value: 1 }).build();
  //   renderScorecard(dice);

  //   expect(screen.getByRole("row", { name: "Chance 11" }));
  // });
});
