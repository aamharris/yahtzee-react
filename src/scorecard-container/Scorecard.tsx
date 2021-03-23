import React from "react";
import ScorecardRow from "./ScorecardRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import UpperSectionBonusRow from "./UpperBonusRow";
import "./scorecard.scss";
import Box from "@material-ui/core/Box";
import { ScorecardRowData } from "../shared/types/scorecardRowData";
import { YahtzeeScorecard } from "../shared/types/yahtzeeScorecard";

type ScorecardProps = {
  scorecard: YahtzeeScorecard;
  onScoreMarked: (row: ScorecardRowData) => void;
};

function Scorecard({ scorecard, onScoreMarked }: ScorecardProps) {
  return (
    <div className="scorecard-container">
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
            <ScorecardRow scorecardRowData={scorecard.upperSection.aces} onScoreClicked={onScoreMarked} />
            <ScorecardRow scorecardRowData={scorecard.lowerSection.threeOfAKind} onScoreClicked={onScoreMarked} />
          </TableRow>
          <TableRow>
            <ScorecardRow scorecardRowData={scorecard.upperSection.twos} onScoreClicked={onScoreMarked} />
            <ScorecardRow scorecardRowData={scorecard.lowerSection.fourOfAKind} onScoreClicked={onScoreMarked} />
          </TableRow>
          <TableRow>
            <ScorecardRow scorecardRowData={scorecard.upperSection.threes} onScoreClicked={onScoreMarked} />
            <ScorecardRow scorecardRowData={scorecard.lowerSection.fullHouse} onScoreClicked={onScoreMarked} />
          </TableRow>
          <TableRow>
            <ScorecardRow scorecardRowData={scorecard.upperSection.fours} onScoreClicked={onScoreMarked} />
            <ScorecardRow scorecardRowData={scorecard.lowerSection.smStraight} onScoreClicked={onScoreMarked} />
          </TableRow>
          <TableRow>
            <ScorecardRow scorecardRowData={scorecard.upperSection.fives} onScoreClicked={onScoreMarked} />
            <ScorecardRow scorecardRowData={scorecard.lowerSection.lgStraight} onScoreClicked={onScoreMarked} />
          </TableRow>
          <TableRow>
            <ScorecardRow scorecardRowData={scorecard.upperSection.sixes} onScoreClicked={onScoreMarked} />
            <ScorecardRow scorecardRowData={scorecard.lowerSection.chance} onScoreClicked={onScoreMarked} />
          </TableRow>
          <TableRow>
            <UpperSectionBonusRow upperSectionBonus={scorecard.upperSectionBonus} />
            <ScorecardRow scorecardRowData={scorecard.lowerSection.yahtzee} onScoreClicked={onScoreMarked} />
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
    </div>
  );
}

export default Scorecard;
