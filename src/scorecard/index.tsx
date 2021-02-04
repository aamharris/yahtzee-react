import React, { useEffect, useState } from "react";
import { YahtzeeDice } from "../App";
import { FULL_HOUSE_SCORE, LG_STRAIGHT_SCORE, SM_STRAIGHT_SCORE, YAHTZEE_SCORE } from "../constants";

type ScorecardProps = {
  dice: YahtzeeDice[];
};

class YahtzeeScorecard {
  upperSection: ScorecardRow[];
  lowerSection: ScorecardRow[];
  totalCountOfDiceByValue: Map<number, number>;

  constructor() {
    this.upperSection = [
      { displayValue: "Aces" },
      { displayValue: "Twos" },
      { displayValue: "Threes" },
      { displayValue: "Fours" },
      { displayValue: "Fives" },
      { displayValue: "Sixes" },
    ];
    this.lowerSection = [
      { displayValue: "3 of a Kind" },
      { displayValue: "4 of a Kind" },
      { displayValue: "Full House" },
      { displayValue: "Sm. Straight" },
      { displayValue: "Lg. Straight" },
      { displayValue: "Chance" },
      { displayValue: "YAHTZEE" },
    ];
    this.totalCountOfDiceByValue = new Map<number, number>();
  }

  hasFullHouse = (): boolean => {
    return (
      this.totalCountOfDiceByValue.size === 2 &&
      (this.totalCountOfDiceByValue.values().next().value === 3 ||
        this.totalCountOfDiceByValue.values().next().value === 2)
    );
  };

  getSumOfDiceWithTheNumber = (number: number): number => {
    if (this.totalCountOfDiceByValue.has(number)) {
      return (this.totalCountOfDiceByValue.get(number) as number) * number;
    }
    return 0;
  };

  hasNumberOfSameDice = (number: number): boolean => {
    return Array.from(this.totalCountOfDiceByValue.values()).filter((v) => v >= number).length > 0;
  };

  getDiceTotal = (): number => {
    return Array.from(this.totalCountOfDiceByValue).reduce((total, kv) => {
      return total + kv[0] * kv[1];
    }, 0);
  };

  calculateUpperSection = () => {
    this.upperSection.forEach((row: ScorecardRow, i: number) => {
      if (!row.markedScore) {
        row.possibleScore = this.getSumOfDiceWithTheNumber(i + 1);
      }
    });
  };

  hasSmallStraight = (): boolean => {
    let consectiveCount = 0;
    Array.from(this.totalCountOfDiceByValue.keys())
      .sort((a, b) => b - a)
      .map((currentNumber, idx, arr) => {
        if (idx !== arr.length && currentNumber - arr[idx + 1] === 1) {
          consectiveCount += 1;
        }
      });

    return consectiveCount === 3;
  };

  calculateLowerSection = (diceTotal: number) => {
    this.lowerSection.forEach((row: ScorecardRow) => {
      if (!row.markedScore) {
        if (row.displayValue == "3 of a Kind") {
          row.possibleScore = this.hasNumberOfSameDice(3) ? diceTotal : 0;
        } else if (row.displayValue == "4 of a Kind") {
          row.possibleScore = this.hasNumberOfSameDice(4) ? diceTotal : 0;
        } else if (row.displayValue === "Full House") {
          row.possibleScore = this.hasFullHouse() ? FULL_HOUSE_SCORE : 0;
        } else if (row.displayValue === "Sm. Straight") {
          row.possibleScore = this.hasSmallStraight() ? SM_STRAIGHT_SCORE : 0;
        } else if (row.displayValue === "Lg. Straight") {
          row.possibleScore = this.totalCountOfDiceByValue.size === 5 ? LG_STRAIGHT_SCORE : 0;
        } else if (row.displayValue === "Chance") {
          row.possibleScore = diceTotal;
        } else {
          row.possibleScore = this.hasNumberOfSameDice(5) ? YAHTZEE_SCORE : 0;
        }
      }
    });
  };

  calculatePossibleScores = (dice: YahtzeeDice[]) => {
    this.totalCountOfDiceByValue = new Map<number, number>();
    dice.forEach((d) => {
      if (d.value) {
        if (this.totalCountOfDiceByValue.has(d.value)) {
          this.totalCountOfDiceByValue.set(d.value, (this.totalCountOfDiceByValue.get(d.value) as number) + 1);
        } else {
          this.totalCountOfDiceByValue.set(d.value, 1);
        }
      }
    });

    this.calculateUpperSection();
    this.calculateLowerSection(this.getDiceTotal());
  };
}

type ScorecardRow = {
  displayValue: string;
  possibleScore?: number;
  markedScore?: number;
};

function Scorecard({ dice }: ScorecardProps) {
  const [scorecard, setScorecard] = useState<YahtzeeScorecard>(new YahtzeeScorecard());

  function markSelectedScore(row: ScorecardRow) {
    row.markedScore = row.possibleScore;
    setScorecard({ ...scorecard } as YahtzeeScorecard);
  }

  useEffect(() => {
    scorecard.calculatePossibleScores(dice);
    setScorecard({ ...scorecard });
  }, [dice]);

  return (
    <div>
      <table>
        <tbody>
          {scorecard?.upperSection.map((r: ScorecardRow) => {
            return (
              <tr key={r.displayValue}>
                <td>{r.displayValue}</td>
                <td style={{ cursor: "pointer" }}>
                  <span onClick={() => markSelectedScore(r)}> {r.markedScore ? r.markedScore : r.possibleScore}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tbody>
          {scorecard?.lowerSection.map((r: ScorecardRow) => {
            return (
              <tr key={r.displayValue}>
                <td>{r.displayValue}</td>
                <td style={{ cursor: "pointer" }}>
                  <span onClick={() => markSelectedScore(r)}> {r.markedScore ? r.markedScore : r.possibleScore}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Scorecard;
