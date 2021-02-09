import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { ScorecardRowData } from ".";

type ScorecardRowProps = {
  scorecardRowData: ScorecardRowData;
  onScoreClicked: (row: ScorecardRowData) => void;
};

function ScorecardRow({ scorecardRowData, onScoreClicked }: ScorecardRowProps) {
  const { category, markedScore, possibleScore } = scorecardRowData;
  return (
    <TableRow>
      <TableCell>{category}</TableCell>
      <TableCell
        align={"center"}
        onClick={() => onScoreClicked(scorecardRowData)}
        style={{ cursor: "pointer", width: "25px" }}
      >
        {markedScore !== undefined ? markedScore : <span style={{ color: "lightgray" }}>{possibleScore}</span>}
      </TableCell>
    </TableRow>
  );
}

export default ScorecardRow;
