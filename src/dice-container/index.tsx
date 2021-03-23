import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleDiceLocked } from "../game/gameSlice";
import Dice from "./Dice";
import { YahtzeeDice } from "../shared/types/yahtzeeDice";

export default function DiceContainer() {
  let gameDice = useSelector((state: RootState) => state.dice);

  const dispatch = useDispatch();

  const onDiceClicked = (die: YahtzeeDice) => {
    dispatch(toggleDiceLocked(die));
  };

  return <Dice dice={gameDice} onDiceClicked={onDiceClicked} />;
}
