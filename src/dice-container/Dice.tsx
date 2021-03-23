import DiceAce from "./images/dice-ace.png";
import DiceTwo from "./images/dice-two.png";
import DiceThree from "./images/dice-three.png";
import DiceFour from "./images/dice-four.png";
import DiceFive from "./images/dice-five.png";
import DiceSix from "./images/dice-six.png";
import "./dice.scss";
import { YahtzeeDice } from "../shared/types/yahtzeeDice";

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

type DiceProps = {
  dice: YahtzeeDice[];
  onDiceClicked: (die: YahtzeeDice) => void;
};

export default function Dice({ dice, onDiceClicked }: DiceProps) {
  return (
    <div className="dice-grid">
      {dice.map((d: YahtzeeDice) => {
        return (
          <div
            key={d.id}
            className={"dice-cell " + (d.isLocked ? "locked" : "")}
            data-testid={`dice-${d.id}`}
            onClick={() => onDiceClicked(d)}
          >
            {d.value ? <img className="dice-img" src={dicePathLookup[d.value]} alt={d.value.toString()} /> : null}
          </div>
        );
      })}
    </div>
  );
}
