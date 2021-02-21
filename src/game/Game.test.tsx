import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import Game from ".";
import {
  FULL_HOUSE_SCORE,
  LG_STRAIGHT_SCORE,
  SM_STRAIGHT_SCORE,
  UPPER_SECTION_BONUS,
  YAHTZEE_SCORE,
} from "../constants";
import { DiceService } from "../dice-service";
import ScoringCategories from "../scorecard/scoringCategories";
import DiceBuilder from "../testUtils/DiceBuilder";

jest.mock("../dice-service");
let mockRoll = DiceService.roll as jest.MockedFunction<typeof DiceService.roll>;

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
    mockRoll.mockReturnValue([{ id: 0, value: 1, isLocked: false }]);
    render(<Game />);
    fireEvent.click(screen.getByRole("button", { name: "Roll" }));
    fireEvent.click(within(screen.getByRole("row", { name: /Aces/ })).getByText(/^\d$/));
    fireEvent.click(screen.getByRole("button", { name: "Roll" }));
    expect(screen.getByText("Round 2 / 13")).toBeInTheDocument();
  });

  it("resets roll count when score is selected", () => {
    mockRoll.mockReturnValue([{ id: 0, value: 1, isLocked: false }]);
    render(<Game />);
    fireEvent.click(screen.getByRole("button", { name: "Roll" }));
    fireEvent.click(within(screen.getByRole("row", { name: /Aces/ })).getByText(/^\d$/));
    fireEvent.click(screen.getByRole("button", { name: "Roll" }));
    expect(screen.getByText("Roll 1 / 3")).toBeInTheDocument();
  });

  describe("Possible scores from roll", () => {
    it("sets possible score for aces", () => {
      mockRoll.mockReturnValue([
        { id: 0, value: 1, isLocked: false },
        { id: 1, value: 1, isLocked: false },
        { id: 2, value: 2, isLocked: false },
      ]);

      render(<Game />);
      fireEvent.click(screen.getByRole("button", { name: "Roll" }));

      expect(screen.getByRole("row", { name: "Aces 2" })).toBeInTheDocument();
    });

    it("sets possible score for twos", () => {
      mockRoll.mockReturnValue([
        { id: 0, value: 2, isLocked: false },
        { id: 1, value: 2, isLocked: false },
        { id: 2, value: 3, isLocked: false },
      ]);

      render(<Game />);
      fireEvent.click(screen.getByRole("button", { name: "Roll" }));

      expect(screen.getByRole("row", { name: "Twos 4" })).toBeInTheDocument();
    });

    it("sets possible score for threes", () => {
      mockRoll.mockReturnValue([
        { id: 0, value: 3, isLocked: false },
        { id: 1, value: 3, isLocked: false },
        { id: 2, value: 4, isLocked: false },
      ]);

      render(<Game />);
      fireEvent.click(screen.getByRole("button", { name: "Roll" }));

      expect(screen.getByRole("row", { name: "Threes 6" })).toBeInTheDocument();
    });

    it("sets possible score for fours", () => {
      mockRoll.mockReturnValue([
        { id: 0, value: 4, isLocked: false },
        { id: 1, value: 4, isLocked: false },
        { id: 2, value: 5, isLocked: false },
      ]);

      render(<Game />);
      fireEvent.click(screen.getByRole("button", { name: "Roll" }));

      expect(screen.getByRole("row", { name: "Fours 8" })).toBeInTheDocument();
    });

    it("sets possible score for fives", () => {
      mockRoll.mockReturnValue([
        { id: 0, value: 5, isLocked: false },
        { id: 1, value: 5, isLocked: false },
        { id: 2, value: 6, isLocked: false },
      ]);

      render(<Game />);
      fireEvent.click(screen.getByRole("button", { name: "Roll" }));

      expect(screen.getByRole("row", { name: "Fives 10" })).toBeInTheDocument();
    });

    it("sets possible score for sixes", () => {
      mockRoll.mockReturnValue([
        { id: 0, value: 6, isLocked: false },
        { id: 1, value: 6, isLocked: false },
        { id: 2, value: 1, isLocked: false },
      ]);

      render(<Game />);
      fireEvent.click(screen.getByRole("button", { name: "Roll" }));

      expect(screen.getByRole("row", { name: "Sixes 12" })).toBeInTheDocument();
    });

    it("adds upper score bonus when upper card has over 63 points", () => {
      const thirtyPoints = new DiceBuilder().addDice({ value: 6 }, 5).build();
      mockRoll.mockReturnValue(thirtyPoints);
      render(<Game />);

      expect(screen.getByRole("row", { name: "Upper Section Bonus" })).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Roll" }));
      fireEvent.click(within(screen.getByRole("row", { name: /Sixes/ })).getByText(30));

      const twentyFivePoints = new DiceBuilder().addDice({ value: 5 }, 5).build();
      mockRoll.mockReturnValue(twentyFivePoints);
      fireEvent.click(screen.getByRole("button", { name: "Roll" }));
      fireEvent.click(within(screen.getByRole("row", { name: /Fives/ })).getByText(25));

      const eightPoints = new DiceBuilder().addDice({ value: 4 }, 2).build();
      mockRoll.mockReturnValue(eightPoints);
      fireEvent.click(screen.getByRole("button", { name: "Roll" }));
      fireEvent.click(within(screen.getByRole("row", { name: /Fours/ })).getByText(8));

      expect(screen.getByRole("row", { name: `Upper Section Bonus ${UPPER_SECTION_BONUS}` })).toBeInTheDocument();
    });

    it("calculates total when full house", () => {
      const fullHouse = new DiceBuilder().addDice({ value: 6 }, 3).addDice({ value: 5 }, 2).build();
      mockRoll.mockReturnValue(fullHouse);
      render(<Game />);
      fireEvent.click(screen.getByRole("button", { name: "Roll" }));

      expect(
        screen.getByRole("row", { name: `${ScoringCategories.fullHouse} ${FULL_HOUSE_SCORE}` })
      ).toBeInTheDocument();
    });

    it("shows total for three of a kind when three of a kind is rolled", () => {
      const threeOfAKind = new DiceBuilder()
        .addDice({ value: 3 }, 3)
        .addDice({ value: 4 })
        .addDice({ value: 1 })
        .build();
      mockRoll.mockReturnValue(threeOfAKind);
      render(<Game />);
      fireEvent.click(screen.getByRole("button", { name: "Roll" }));

      expect(within(screen.getByRole("row", { name: /3 of a Kind/i })).getByText(14)).toBeInTheDocument();
    });

    it("shows total for four of a kind when rolled", () => {
      const fourOfAKind = new DiceBuilder().addDice({ value: 3 }, 4).addDice({ value: 4 }).build();
      mockRoll.mockReturnValue(fourOfAKind);
      render(<Game />);
      fireEvent.click(screen.getByRole("button", { name: "Roll" }));

      expect(within(screen.getByRole("row", { name: /4 of a Kind/i })).getByText(16)).toBeInTheDocument();
    });

    it("shows yahtzee score when yahtzee is rolled", () => {
      const yahtzee = new DiceBuilder().addDice({ value: 3 }, 5).build();
      mockRoll.mockReturnValue(yahtzee);
      render(<Game />);
      fireEvent.click(screen.getByRole("button", { name: "Roll" }));

      expect(screen.getByRole("row", { name: `YAHTZEE ${YAHTZEE_SCORE}` })).toBeInTheDocument();
    });

    it("shows total for lg straight when lg straight is rolled", () => {
      const lgStraight = new DiceBuilder()
        .addDice({ value: 1 })
        .addDice({ value: 2 })
        .addDice({ value: 3 })
        .addDice({ value: 4 })
        .addDice({ value: 5 })
        .build();

      mockRoll.mockReturnValue(lgStraight);
      render(<Game />);
      fireEvent.click(screen.getByRole("button", { name: "Roll" }));

      expect(
        within(screen.getByRole("row", { name: /Lg. Straight/i })).getByText(LG_STRAIGHT_SCORE)
      ).toBeInTheDocument();
    });

    it("shows total for sm straight when roll has sm straight", () => {
      const smStraight = new DiceBuilder()
        .addDice({ value: 1 })
        .addDice({ value: 2 })
        .addDice({ value: 3 })
        .addDice({ value: 4 })
        .addDice({ value: 6 })
        .build();

      mockRoll.mockReturnValue(smStraight);
      render(<Game />);
      fireEvent.click(screen.getByRole("button", { name: "Roll" }));

      expect(
        within(screen.getByRole("row", { name: /Sm. Straight/ })).getByText(SM_STRAIGHT_SCORE)
      ).toBeInTheDocument();
    });

    it("shows total for sm straight when lg straight is rolled", () => {
      const lgStraight = new DiceBuilder()
        .addDice({ value: 1 })
        .addDice({ value: 2 })
        .addDice({ value: 3 })
        .addDice({ value: 4 })
        .addDice({ value: 5 })
        .build();

      mockRoll.mockReturnValue(lgStraight);
      render(<Game />);
      fireEvent.click(screen.getByRole("button", { name: "Roll" }));

      expect(
        within(screen.getByRole("row", { name: /Sm. Straight/i })).getByText(SM_STRAIGHT_SCORE)
      ).toBeInTheDocument();
    });

    it("shows dice total for chance", () => {
      const roll = new DiceBuilder().addDice({ value: 2 }, 2).addDice({ value: 3 }, 2).addDice({ value: 1 }).build();
      mockRoll.mockReturnValue(roll);
      render(<Game />);
      fireEvent.click(screen.getByRole("button", { name: "Roll" }));

      expect(screen.getByRole("row", { name: "Chance 11" })).toBeInTheDocument();
    });
  });
});
