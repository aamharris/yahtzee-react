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

    expect(screen.getByRole("row", { name: /Aces 1/ })).toBeInTheDocument();
    expect(screen.getByRole("row", { name: /Twos 2/ })).toBeInTheDocument();
    expect(screen.getByRole("row", { name: /Threes 3/ })).toBeInTheDocument();
    expect(screen.getByRole("row", { name: /Fours 4/ })).toBeInTheDocument();
    expect(screen.getByRole("row", { name: /Fives 5/ })).toBeInTheDocument();
    expect(screen.getByRole("row", { name: /Sixes 6/ })).toBeInTheDocument();
  });
});
