import React, { useEffect, useState } from "react";
import { YahtzeeDice } from "../Game";
import { FULL_HOUSE_SCORE, LG_STRAIGHT_SCORE, SM_STRAIGHT_SCORE, YAHTZEE_SCORE } from "../constants";
import ScorecardRow from "./ScorecardRow";
import ScorecardCalculator from "./scorecardManager";

export type YahtzeeScorecard2 = {
  upperSection: ScorecardRowData[];
  lowerSection: ScorecardRowData[];
  totalScore: number;
};

export type ScorecardRowData = {
  category: string;
  possibleScore?: number;
  markedScore?: number;
};

type ScorecardProps = {
  scorecard: YahtzeeScorecard2;
  dice: YahtzeeDice[];
  onScorecardChanged: (scorecard: YahtzeeScorecard2) => void;
  onScoreMarked: () => void;
  canSelectScore: boolean;
};

function Scorecard({ dice, scorecard, onScorecardChanged, onScoreMarked, canSelectScore }: ScorecardProps) {
  const markSelectedScore = (row: ScorecardRowData): void => {
    if (canSelectScore) {
      row.markedScore = row.possibleScore;
      onScorecardChanged(scorecard);
      onScoreMarked();
    }
  };

  useEffect(() => {
    console.log("rendering from useEffect");
    const updatedScorecard = ScorecardCalculator.calculatePossibleScores(scorecard, dice);
    onScorecardChanged(updatedScorecard);
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
