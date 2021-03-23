import { YahtzeeDice } from "../shared/types/yahtzeeDice";

export default class DiceBuilder {
  dice: YahtzeeDice[];

  constructor() {
    this.dice = [];
  }

  addDice = (dice: Partial<YahtzeeDice>, quantity: number = 1) => {
    this.dice = this.dice.concat(new Array<YahtzeeDice>(quantity).fill(dice as YahtzeeDice));
    return this;
  };

  build = (): YahtzeeDice[] => {
    return this.dice;
  };
}
