import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { MAX_ROLL_PER_ROUND } from "../constants";

type RollContainerProps = {
  currentRollCount: number;
  onRollClicked: () => void;
  canRollDice: boolean;
};

export default function RollContainer({ currentRollCount, onRollClicked, canRollDice }: RollContainerProps) {
  return (
    <>
      <Box display={"flex"} justifyContent={"flex-end"} visibility={currentRollCount > 0 ? "visible" : "hidden"}>
        <Typography variant={"caption"}>{`Roll ${currentRollCount} / ${MAX_ROLL_PER_ROUND}`}</Typography>
      </Box>
      <Button
        fullWidth
        size={"large"}
        color={"primary"}
        variant={"contained"}
        onClick={() => onRollClicked()}
        disabled={!canRollDice}
      >
        {"Roll"}
      </Button>
    </>
  );
}
