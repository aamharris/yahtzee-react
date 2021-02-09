import { ScorecardRowData, YahtzeeScorecard2 } from ".";
import { FULL_HOUSE_SCORE, LG_STRAIGHT_SCORE, SM_STRAIGHT_SCORE, YAHTZEE_SCORE } from "../constants";
import { YahtzeeDice } from "../game";

export function createNewScorecard(): YahtzeeScorecard2 {
  return {
    upperSection: [
      { category: "Aces", possibleScore: 0 },
      { category: "Twos" },
      { category: "Threes" },
      { category: "Fours" },
      { category: "Fives" },
      { category: "Sixes" },
    ],
    lowerSection: [
      { category: "3 of a Kind" },
      { category: "4 of a Kind" },
      { category: "Full House" },
      { category: "Sm. Straight" },
      { category: "Lg. Straight" },
      { category: "Chance" },
      { category: "YAHTZEE" },
    ],
    totalScore: 0,
  };
}

const ScorecardCalculator = {
  totalCountOfDiceByValue: new Map<number, number>(),

  hasFullHouse(): boolean {
    return (
      this.totalCountOfDiceByValue.size === 2 &&
      (this.totalCountOfDiceByValue.values().next().value === 3 ||
        this.totalCountOfDiceByValue.values().next().value === 2)
    );
  },

  getSumOfDiceWithTheNumber(number: number): number {
    if (this.totalCountOfDiceByValue.has(number)) {
      return (this.totalCountOfDiceByValue.get(number) as number) * number;
    }
    return 0;
  },

  hasNumberOfSameDice(number: number): boolean {
    return Array.from(this.totalCountOfDiceByValue.values()).filter((v) => v >= number).length > 0;
  },

  getDiceTotal(): number {
    return Array.from(this.totalCountOfDiceByValue).reduce((total, kv) => {
      return total + kv[0] * kv[1];
    }, 0);
  },

  hasSmallStraight(): boolean {
    let consectiveCount = 0;
    Array.from(this.totalCountOfDiceByValue.keys())
      .sort((a, b) => b - a)
      .forEach((currentNumber, idx, arr) => {
        if (idx !== arr.length && currentNumber - arr[idx + 1] === 1) {
          consectiveCount += 1;
        }
      });

    return consectiveCount >= 3;
  },

  calculatePossibleScores(scorecard: YahtzeeScorecard2, dice: YahtzeeDice[]): YahtzeeScorecard2 {
    let scorecardCopy = { ...scorecard };
    this.totalCountOfDiceByValue = new Map<number, number>();
    let totalScore = 0;
    dice.forEach((d) => {
      if (d.value) {
        if (this.totalCountOfDiceByValue.has(d.value)) {
          this.totalCountOfDiceByValue.set(d.value, (this.totalCountOfDiceByValue.get(d.value) as number) + 1);
        } else {
          this.totalCountOfDiceByValue.set(d.value, 1);
        }
      }
    });

    scorecardCopy.upperSection.forEach((row: ScorecardRowData, i: number) => {
      if (row.markedScore === undefined) {
        row.possibleScore = this.getSumOfDiceWithTheNumber(i + 1);
      } else {
        totalScore += row.markedScore;
      }
    });

    const diceTotal = this.getDiceTotal();
    scorecardCopy.lowerSection.forEach((row: ScorecardRowData) => {
      if (row.markedScore === undefined) {
        if (row.category === "3 of a Kind") {
          row.possibleScore = this.hasNumberOfSameDice(3) ? diceTotal : 0;
        } else if (row.category === "4 of a Kind") {
          row.possibleScore = this.hasNumberOfSameDice(4) ? diceTotal : 0;
        } else if (row.category === "Full House") {
          row.possibleScore = this.hasFullHouse() ? FULL_HOUSE_SCORE : 0;
        } else if (row.category === "Sm. Straight") {
          row.possibleScore = this.hasSmallStraight() ? SM_STRAIGHT_SCORE : 0;
        } else if (row.category === "Lg. Straight") {
          row.possibleScore = this.totalCountOfDiceByValue.size === 5 ? LG_STRAIGHT_SCORE : 0;
        } else if (row.category === "Chance") {
          row.possibleScore = diceTotal;
        } else {
          row.possibleScore = this.hasNumberOfSameDice(5) ? YAHTZEE_SCORE : 0;
        }
      } else {
        totalScore += row.markedScore;
      }
    });

    scorecardCopy.totalScore = totalScore;
    return scorecardCopy;
  },
};

export default ScorecardCalculator;
