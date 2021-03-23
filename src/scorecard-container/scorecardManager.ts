import { FULL_HOUSE_SCORE, SM_STRAIGHT_SCORE, LG_STRAIGHT_SCORE, YAHTZEE_SCORE } from "../constants";
import { ScorecardRowData } from "../shared/types/scorecardRowData";
import ScoringCategories from "../shared/types/scoringCategories";
import { YahtzeeDice } from "../shared/types/yahtzeeDice";
import { YahtzeeScorecard } from "../shared/types/yahtzeeScorecard";

export const createNewScorecard = (): YahtzeeScorecard => {
  return {
    upperSection: {
      aces: { possibleScore: 0, category: ScoringCategories.aces, key: "aces" },
      twos: { possibleScore: 0, category: ScoringCategories.twos, key: "twos" },
      threes: { possibleScore: 0, category: ScoringCategories.threes, key: "threes" },
      fours: { possibleScore: 0, category: ScoringCategories.fours, key: "fours" },
      fives: { possibleScore: 0, category: ScoringCategories.fives, key: "fives" },
      sixes: { possibleScore: 0, category: ScoringCategories.sixes, key: "sixes" },
    },
    lowerSection: {
      threeOfAKind: { possibleScore: 0, category: ScoringCategories.threeOfAKind, key: "threeOfAKind" },
      fourOfAKind: { possibleScore: 0, category: ScoringCategories.fourOfAKind, key: "fourOfAKind" },
      fullHouse: { possibleScore: 0, category: ScoringCategories.fullHouse, key: "fullHouse" },
      smStraight: { possibleScore: 0, category: ScoringCategories.smallStraight, key: "smStraight" },
      lgStraight: { possibleScore: 0, category: ScoringCategories.largeStraight, key: "lgStraight" },
      chance: { possibleScore: 0, category: ScoringCategories.chance, key: "chance" },
      yahtzee: { possibleScore: 0, category: ScoringCategories.yahtzee, key: "yahtzee" },
    },
    upperSectionBonus: 0,
    totalScore: 0,
  };
};

export const setPossibleScores = (scorecard: YahtzeeScorecard, dice: YahtzeeDice[]): void => {
  const totalCountOfDiceByValue = new Map<number, number>();

  const getSumOfDiceWithTheNumber = (number: number): number => {
    if (totalCountOfDiceByValue.has(number)) {
      return (totalCountOfDiceByValue.get(number) as number) * number;
    }
    return 0;
  };

  const hasFullHouse = (): boolean => {
    return (
      totalCountOfDiceByValue.size === 2 &&
      (totalCountOfDiceByValue.values().next().value === 3 || totalCountOfDiceByValue.values().next().value === 2)
    );
  };

  const hasNumberOfSameDice = (number: number): boolean => {
    return Array.from(totalCountOfDiceByValue.values()).filter((v) => v >= number).length > 0;
  };

  const getDiceTotal = (): number => {
    return Array.from(totalCountOfDiceByValue).reduce((total, kv) => {
      return total + kv[0] * kv[1];
    }, 0);
  };

  const hasStraightOfSize = (straightSize: number) => {
    let consectiveCount = 1;
    let largestConsecutive = consectiveCount;

    Array.from(totalCountOfDiceByValue.keys())
      .sort((a, b) => b - a)
      .forEach((currentNumber, idx, arr) => {
        if (idx !== arr.length && currentNumber - arr[idx + 1] === 1) {
          consectiveCount += 1;
        } else {
          if (largestConsecutive < consectiveCount) {
            largestConsecutive = consectiveCount;
            consectiveCount = 1;
          }
        }
      });

    return largestConsecutive >= straightSize;
  };

  dice.forEach((d: YahtzeeDice) => {
    if (d.value) {
      if (totalCountOfDiceByValue.has(d.value)) {
        totalCountOfDiceByValue.set(d.value, (totalCountOfDiceByValue.get(d.value) as number) + 1);
      } else {
        totalCountOfDiceByValue.set(d.value, 1);
      }
    }
  });

  Object.keys(scorecard.upperSection).forEach((category, idx) => {
    let row = scorecard.upperSection[category];
    if (row.markedScore === undefined) {
      scorecard.upperSection[category] = { ...row, possibleScore: getSumOfDiceWithTheNumber(idx + 1) };
    }
  });

  const diceTotal = getDiceTotal();

  Object.values(scorecard.lowerSection).forEach((row: ScorecardRowData) => {
    if (row.markedScore === undefined) {
      if (row.category === "3 of a Kind") {
        row.possibleScore = hasNumberOfSameDice(3) ? diceTotal : 0;
      } else if (row.category === "4 of a Kind") {
        row.possibleScore = hasNumberOfSameDice(4) ? diceTotal : 0;
      } else if (row.category === "Full House") {
        row.possibleScore = hasFullHouse() ? FULL_HOUSE_SCORE : 0;
      } else if (row.category === "Sm. Straight") {
        row.possibleScore = hasStraightOfSize(4) ? SM_STRAIGHT_SCORE : 0;
      } else if (row.category === "Lg. Straight") {
        row.possibleScore = hasStraightOfSize(5) ? LG_STRAIGHT_SCORE : 0;
      } else if (row.category === "Chance") {
        row.possibleScore = diceTotal;
      } else {
        row.possibleScore = hasNumberOfSameDice(5) ? YAHTZEE_SCORE : 0;
      }
    }
  });
};
