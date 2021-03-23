import React from "react";
import Box from "@material-ui/core/Box";
import TableCell from "@material-ui/core/TableCell";

type UpperSectionBonusRowProps = {
  upperSectionBonus: number;
};
/*
This will be updated to show a progress meter so that the user knows
how close they are to the bonus without needing to calculate in their head
*/
function UpperSectionBonusRow({ upperSectionBonus }: UpperSectionBonusRowProps) {
  return (
    <TableCell style={{ borderRight: "1px solid lightgray" }}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <span>{"Upper Bonus"}</span>
        <Box style={{ width: "25px", textAlign: "center" }}>
          {upperSectionBonus !== 0 ? upperSectionBonus : <span style={{ color: "lightgray" }}>{"—"}</span>}
        </Box>
      </Box>
    </TableCell>
  );
}

export default UpperSectionBonusRow;
