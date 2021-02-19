import Box, { BoxProps } from "@material-ui/core/Box";
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

export default function DiceContainer({ dice, onDiceClicked }: DiceContainerProps) {
  type DicePlaceholderProps = BoxProps & {
    islocked: boolean;
  };

  const DiceCell = styled(({ islocked, ...other }: DicePlaceholderProps) => <Box {...other} />)({
    background: "#f3f3f3",
    borderRadius: 3,
    boxShadow: (props: DicePlaceholderProps) =>
      `0px 0px 3px 3px rgba${props.islocked ? "(230,0,0,0.20)" : "(0,0,0,0.20)"}`,
    webkitBoxShadow: "0px 0px 3px 3px rgba(0,0,0,0.20)",
    mozBoxShadow: "0px 0px 3px 3px rgba(0,0,0,0.20)",
    display: "flex",
    "&::before": {
      content: '""',
      display: "block",
      width: "0",
      height: "0",
      paddingBottom: "100%",
    },
  });

  const DiceGrid = styled(Box)({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gridGap: "2%",
    padding: "10px 0",
  });

  return (
    <DiceGrid>
      {dice.map((d: YahtzeeDice) => {
        return (
          <DiceCell key={d.id} islocked={d.isLocked} data-testid={`dice-${d.id}`} onClick={() => onDiceClicked(d)}>
            {d.value ? (
              <img style={{ maxWidth: "100%" }} src={dicePathLookup[d.value]} alt={d.value.toString()} />
            ) : null}
          </DiceCell>
        );
      })}
    </DiceGrid>
  );
}
