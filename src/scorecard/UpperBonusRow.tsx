import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

type UpperSectionBonusRowProps = {
  upperSectionBonus: number;
};

function UpperSectionBonusRow({ upperSectionBonus }: UpperSectionBonusRowProps) {
  return (
    <TableRow>
      <TableCell>{"Upper Section Bonus"}</TableCell>
      <TableCell align={"center"}>{upperSectionBonus !== 0 ? upperSectionBonus : ""}</TableCell>
    </TableRow>
  );
}

export default UpperSectionBonusRow;
