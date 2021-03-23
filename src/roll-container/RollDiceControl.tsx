import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { MAX_ROLL_PER_ROUND } from "../constants";

type RollDiceControlProps = {
  currentRollCount: number;
  onRollClicked: () => void;
  isGameOver: boolean;
};

export default function RollDiceControl({ currentRollCount, onRollClicked, isGameOver }: RollDiceControlProps) {
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
        disabled={currentRollCount === MAX_ROLL_PER_ROUND || isGameOver}
      >
        {"Roll"}
      </Button>
    </>
  );
}
