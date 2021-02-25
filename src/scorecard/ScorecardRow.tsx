import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import { findByLabelText } from "@testing-library/react";
import React from "react";
import { ScorecardRowData } from ".";

type ScorecardRowProps = {
  scorecardRowData: ScorecardRowData;
  onScoreClicked: (row: ScorecardRowData) => void;
};

function ScorecardRow({ scorecardRowData, onScoreClicked }: ScorecardRowProps) {
  const { category, markedScore, possibleScore } = scorecardRowData;

  const ScorecardRowCell = styled(TableCell)({
    "&:nth-child(odd)": {
      borderRight: "1px solid lightgray",
    },
  });

  return (
    <ScorecardRowCell>
      <Box display={"flex"} justifyContent={"space-between"}>
        {category}
        <Box
          onClick={() => onScoreClicked(scorecardRowData)}
          style={{ textAlign: "center", cursor: "pointer", width: "25px" }}
        >
          {markedScore !== undefined ? markedScore : <span style={{ color: "lightgray" }}>{possibleScore}</span>}
        </Box>
      </Box>
    </ScorecardRowCell>
  );
}

export default ScorecardRow;
