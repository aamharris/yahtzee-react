import { YahtzeeDice } from "../shared/types/yahtzeeDice";

export const DiceService = {
  roll(dice: YahtzeeDice[]): YahtzeeDice[] {
    return dice.map((d) => {
      if (!d.isLocked) {
        d.value = Math.floor(Math.random() * 6 + 1);
      }
      return d;
    });
  },
};
