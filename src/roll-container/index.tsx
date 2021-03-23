import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { rollDice } from "../game/gameSlice";
import { RootState } from "../store";
import RollDiceControl from "./RollDiceControl";

export default function RollContainer() {
  const currentRollCount = useSelector((state: RootState) => state.currentRollCount);
  const isGameOver = useSelector((state: RootState) => state.isGameOver);

  const dispatch = useDispatch();

  const onRollClicked = () => {
    dispatch(rollDice());
  };

  return <RollDiceControl currentRollCount={currentRollCount} onRollClicked={onRollClicked} isGameOver={isGameOver} />;
}
