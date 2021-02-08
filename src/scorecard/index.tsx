import React, { useEffect } from "react";
import { YahtzeeDice } from "../game";
import ScorecardRow from "./ScorecardRow";
import ScorecardCalculator from "./scorecardManager";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import { styled } from "@material-ui/core/styles";

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

  const ScorecardTableContainer = styled(TableContainer)({
    border: 1,
    borderRadius: 3,
    borderStyle: "solid",
    borderColor: "darkgray",
  });

  return (
    <ScorecardTableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Upper Section</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scorecard?.upperSection.map((rowData: ScorecardRowData) => {
            return (
              <ScorecardRow
                key={rowData.category}
                scorecardRowData={rowData}
                onScoreClicked={() => markSelectedScore(rowData)}
              />
            );
          })}
        </TableBody>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Lower Section</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scorecard?.lowerSection.map((rowData: ScorecardRowData) => {
            return (
              <ScorecardRow
                key={rowData.category}
                scorecardRowData={rowData}
                onScoreClicked={() => markSelectedScore(rowData)}
              />
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total Score</TableCell>
            <TableCell align={"center"}>{scorecard?.totalScore}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </ScorecardTableContainer>
  );
}

export default Scorecard;
