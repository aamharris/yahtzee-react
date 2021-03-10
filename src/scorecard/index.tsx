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
import UpperSectionBonusRow from "./UpperBonusRow";
import ScoringCategories from "./scoringCategories";
import Box from "@material-ui/core/Box";

export type YahtzeeScorecard2 = {
  upperSection: ScorecardRowData[];
  lowerSection: ScorecardRowData[];
  totalScore: number;
  upperSectionBonus: number;
};

export type ScorecardRowData = {
  category: ScoringCategories;
  possibleScore?: number;
  markedScore?: number;
};

type ScorecardProps = {
  scorecard: YahtzeeScorecard2;
  onScoreMarked: (row: ScorecardRowData) => void;
};

/*
TODO: Refactor File
After having responsive issues with mobile devices, I split this table into two columns instead of one.
Originally, these were all in loops, but after splitting into two columns, I have to refactor so that 
the loops will play nicely with non-clickable rows such as upper bonus and yahtzee bonus.
There are also a few styles in here that need to be separated into styled components
*/
function Scorecard({ scorecard, onScoreMarked }: ScorecardProps) {
  const ScorecardTableContainer = styled(TableContainer)({
    border: 1,
    borderRadius: 3,
    borderStyle: "solid",
    borderColor: "darkgray",
  });

  return (
    <ScorecardTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={"50%"} style={{ borderRight: "1px solid lightgray" }}>
              Upper Section
            </TableCell>
            <TableCell>Lower Section</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <ScorecardRow
              scorecardRowData={scorecard.upperSection[0]}
              onScoreClicked={() => onScoreMarked(scorecard.upperSection[0])}
            />
            <ScorecardRow
              scorecardRowData={scorecard.lowerSection[0]}
              onScoreClicked={() => onScoreMarked(scorecard.lowerSection[0])}
            />
          </TableRow>
          <TableRow>
            <ScorecardRow
              scorecardRowData={scorecard.upperSection[1]}
              onScoreClicked={() => onScoreMarked(scorecard.upperSection[1])}
            />
            <ScorecardRow
              scorecardRowData={scorecard.lowerSection[1]}
              onScoreClicked={() => onScoreMarked(scorecard.lowerSection[1])}
            />
          </TableRow>
          <TableRow>
            <ScorecardRow
              scorecardRowData={scorecard.upperSection[2]}
              onScoreClicked={() => onScoreMarked(scorecard.upperSection[2])}
            />
            <ScorecardRow
              scorecardRowData={scorecard.lowerSection[2]}
              onScoreClicked={() => onScoreMarked(scorecard.lowerSection[2])}
            />
          </TableRow>
          <TableRow>
            <ScorecardRow
              scorecardRowData={scorecard.upperSection[3]}
              onScoreClicked={() => onScoreMarked(scorecard.upperSection[3])}
            />
            <ScorecardRow
              scorecardRowData={scorecard.lowerSection[3]}
              onScoreClicked={() => onScoreMarked(scorecard.lowerSection[3])}
            />
          </TableRow>
          <TableRow>
            <ScorecardRow
              scorecardRowData={scorecard.upperSection[4]}
              onScoreClicked={() => onScoreMarked(scorecard.upperSection[4])}
            />
            <ScorecardRow
              scorecardRowData={scorecard.lowerSection[4]}
              onScoreClicked={() => onScoreMarked(scorecard.lowerSection[4])}
            />
          </TableRow>
          <TableRow>
            <ScorecardRow
              scorecardRowData={scorecard.upperSection[5]}
              onScoreClicked={() => onScoreMarked(scorecard.upperSection[5])}
            />
            <ScorecardRow
              scorecardRowData={scorecard.lowerSection[5]}
              onScoreClicked={() => onScoreMarked(scorecard.lowerSection[5])}
            />
          </TableRow>
          <TableRow>
            <UpperSectionBonusRow upperSectionBonus={scorecard.upperSectionBonus} />
            <ScorecardRow
              scorecardRowData={scorecard.lowerSection[6]}
              onScoreClicked={() => onScoreMarked(scorecard.lowerSection[6])}
            />
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow style={{ borderTop: "2px solid darkgray" }}>
            <TableCell variant={"body"} colSpan={2}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <span>{"Total Score"}</span>
                <Box style={{ width: "25px", textAlign: "center" }}>{scorecard?.totalScore}</Box>
              </Box>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </ScorecardTableContainer>
  );
}

export default Scorecard;
