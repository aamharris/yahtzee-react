import React from "react";
import ScorecardRow from "./ScorecardRow";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import { styled } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import UpperSectionBonusRow from "./UpperBonusRow";

export type YahtzeeScorecard2 = {
  upperSection: ScorecardRowData[];
  lowerSection: ScorecardRowData[];
  totalScore: number;
  upperSectionBonus: number;
};

export type ScorecardRowData = {
  category: string;
  possibleScore?: number;
  markedScore?: number;
};

type ScorecardProps = {
  scorecard: YahtzeeScorecard2;
  onScoreMarked: () => void;
  canSelectScore: boolean;
};

function Scorecard({ scorecard, onScoreMarked, canSelectScore }: ScorecardProps) {
  const markSelectedScore = (row: ScorecardRowData): void => {
    if (canSelectScore) {
      row.markedScore = row.possibleScore;
      onScoreMarked();
    }
  };

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
          <UpperSectionBonusRow upperSectionBonus={scorecard.upperSectionBonus} />
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
          <TableRow style={{ borderTop: "2px solid darkgray" }}>
            <TableCell variant={"head"}>
              <Typography>Total Score</Typography>
            </TableCell>
            <TableCell align={"center"}>{scorecard?.totalScore}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </ScorecardTableContainer>
  );
}

export default Scorecard;
