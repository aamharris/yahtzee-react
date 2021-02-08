import Box, { BoxProps } from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import React from "react";
import { YahtzeeDice } from "../game";
import DiceAce from "./images/dice-ace.png";
import DiceTwo from "./images/dice-two.png";
import DiceThree from "./images/dice-three.png";
import DiceFour from "./images/dice-four.png";
import DiceFive from "./images/dice-five.png";
import DiceSix from "./images/dice-six.png";
import { styled } from "@material-ui/core/styles";

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

  type DicePlaceholderProps = BoxProps & {
    islocked: boolean;
  };

  const DicePlaceholder = styled(({ islocked, ...other }) => <Box {...other} />)({
    background: "##f3f3f3",
    borderRadius: 3,
    boxShadow: (props: DicePlaceholderProps) =>
      `0px 0px 3px 3px rgba${props.islocked ? "(230,0,0,0.20)" : "(0,0,0,0.20)"}`,
    webkitBoxShadow: "0px 0px 3px 3px rgba(0,0,0,0.20)",
    mozBoxShadow: "0px 0px 3px 3px rgba(0,0,0,0.20)",
    width: "60px",
    height: "60px",
    margin: "10px",
  });

  return (
    <>
      <Box py={1} display={"flex"}>
        {dice.map((d: YahtzeeDice) => {
          return (
            <DicePlaceholder
              key={d.id}
              islocked={d.isLocked}
              data-testid={`dice-${d.id}`}
              onClick={() => onDiceClicked(d)}
            >
              {d.value ? (
                <img style={{ height: "100%" }} src={dicePathLookup[d.value]} alt={d.value.toString()} />
              ) : null}
            </DicePlaceholder>
          );
        })}
      </Box>
      <Button
        fullWidth
        size={"large"}
        color={"primary"}
        variant={"contained"}
        onClick={rollDice}
        disabled={!canRollDice}
      >
        <div>Roll</div>
      </Button>
    </>
  );
}
