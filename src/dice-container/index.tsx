import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import React from "react";
import { YahtzeeDice } from "../game";
import DiceAce from "./images/dice-ace.png";
import DiceTwo from "./images/dice-two.png";
import DiceThree from "./images/dice-three.png";
import DiceFour from "./images/dice-four.png";
import DiceFive from "./images/dice-five.png";
import DiceSix from "./images/dice-six.png";

type DiceContainerProps = {
  dice: YahtzeeDice[];
  canRollDice: boolean;
  onDiceRolled: (dice: YahtzeeDice[]) => void;
  onDiceClicked: (selectedDice: YahtzeeDice) => void;
};

interface NumberToDicePathMap {
  [value: number]: string;
}

const dicePathLookup: NumberToDicePathMap = {
  1: DiceAce,
  2: DiceTwo,
  3: DiceThree,
  4: DiceFour,
  5: DiceFive,
  6: DiceSix,
};

export default function DiceContainer({ dice, canRollDice, onDiceRolled, onDiceClicked }: DiceContainerProps) {
  const rollDice = (): void => {
    const diceRoll: YahtzeeDice[] = dice.map((d) => {
      if (!d.isLocked) {
        d.value = Math.floor(Math.random() * 6 + 1);
      }

      return d;
    });

    onDiceRolled(diceRoll);
  };

  return (
    <>
      <Box display={"flex"}>
        {dice.map((d: YahtzeeDice) => {
          return (
            <div
              key={d.id}
              data-testid={`dice-${d.id}`}
              onClick={() => onDiceClicked(d)}
              style={{ width: "50px", height: "50px", border: `1px solid ${d.isLocked ? "yellow" : "gray"}` }}
            >
              {d.value ? (
                <img style={{ width: "50px", height: "50px" }} src={dicePathLookup[d.value]} alt={d.value.toString()} />
              ) : (
                "-"
              )}
            </div>
          );
        })}
      </Box>
      <Button color="primary" onClick={rollDice} disabled={!canRollDice}>
        Roll
      </Button>
    </>
  );
}
