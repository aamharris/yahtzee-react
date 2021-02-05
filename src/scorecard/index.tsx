import React, { useEffect, useState } from "react";
import { YahtzeeDice } from "../Game";
import { FULL_HOUSE_SCORE, LG_STRAIGHT_SCORE, SM_STRAIGHT_SCORE, YAHTZEE_SCORE } from "../constants";
import ScorecardRow from "./ScorecardRow";

class YahtzeeScorecard {
  upperSection: ScorecardRowData[];
  lowerSection: ScorecardRowData[];
  totalCountOfDiceByValue: Map<number, number>;
  totalScore: number = 10;

  constructor() {
    this.upperSection = [
      { category: "Aces" },
      { category: "Twos" },
      { category: "Threes" },
      { category: "Fours" },
      { category: "Fives" },
      { category: "Sixes" },
    ];
    this.lowerSection = [
      { category: "3 of a Kind" },
      { category: "4 of a Kind" },
      { category: "Full House" },
      { category: "Sm. Straight" },
      { category: "Lg. Straight" },
      { category: "Chance" },
      { category: "YAHTZEE" },
    ];
    this.totalCountOfDiceByValue = new Map<number, number>();
  }

  private hasFullHouse = (): boolean => {
    return (
      this.totalCountOfDiceByValue.size === 2 &&
      (this.totalCountOfDiceByValue.values().next().value === 3 ||
        this.totalCountOfDiceByValue.values().next().value === 2)
    );
  };

  private getSumOfDiceWithTheNumber = (number: number): number => {
    if (this.totalCountOfDiceByValue.has(number)) {
      return (this.totalCountOfDiceByValue.get(number) as number) * number;
    }
    return 0;
  };

  private hasNumberOfSameDice = (number: number): boolean => {
    return Array.from(this.totalCountOfDiceByValue.values()).filter((v) => v >= number).length > 0;
  };

  private getDiceTotal = (): number => {
    return Array.from(this.totalCountOfDiceByValue).reduce((total, kv) => {
      return total + kv[0] * kv[1];
    }, 0);
  };

  private hasSmallStraight = (): boolean => {
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

    let total = 0;
    this.upperSection.forEach((row: ScorecardRowData, i: number) => {
      if (!row.markedScore) {
        row.possibleScore = this.getSumOfDiceWithTheNumber(i + 1);
      } else {
        total += row.markedScore;
      }
    });

    const diceTotal = this.getDiceTotal();
    this.lowerSection.forEach((row: ScorecardRowData) => {
      if (!row.markedScore) {
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
        total += row.markedScore;
      }
    });

    this.totalScore = total;
    console.log(this.totalScore);
  };
}

export type ScorecardRowData = {
  category: string;
  possibleScore?: number;
  markedScore?: number;
};

type ScorecardProps = {
  dice: YahtzeeDice[];
  onScoreMarked: () => void;
  canSelectScore: boolean;
};

function Scorecard({ dice, onScoreMarked, canSelectScore }: ScorecardProps) {
  const [scorecard, setScorecard] = useState<YahtzeeScorecard>(new YahtzeeScorecard());

  const markSelectedScore = (row: ScorecardRowData): void => {
    if (canSelectScore) {
      row.markedScore = row.possibleScore;
      setScorecard({ ...scorecard } as YahtzeeScorecard);
      onScoreMarked();
    }
  };

  useEffect(() => {
    scorecard.calculatePossibleScores(dice);
    console.log(scorecard);
    const total = scorecard.totalScore;
    console.log("total: " + total);
    setScorecard({ ...scorecard, totalScore: total } as YahtzeeScorecard);
  }, [dice]);

  return (
    <div>
      <table style={{ width: "200px" }}>
        <thead>
          <tr>
            <th>Upper Section</th>
          </tr>
        </thead>
        <tbody>
          {scorecard?.upperSection.map((rowData: ScorecardRowData) => {
            return (
              <ScorecardRow
                key={rowData.category}
                scorecardRowData={rowData}
                onScoreClicked={() => markSelectedScore(rowData)}
              />
            );
          })}
        </tbody>
        <thead>
          <tr>
            <th>Lower Section</th>
          </tr>
        </thead>
        <tbody>
          {scorecard?.lowerSection.map((rowData: ScorecardRowData) => {
            return (
              <ScorecardRow
                key={rowData.category}
                scorecardRowData={rowData}
                onScoreClicked={() => markSelectedScore(rowData)}
              />
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>Total Score</td>
            <td>{scorecard?.totalScore}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Scorecard;
