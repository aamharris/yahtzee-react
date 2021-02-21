import { DiceService } from ".";
import { YahtzeeDice } from "../game";

describe("Dice Service", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("rolls a 1 when math.random is 0", async () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.0);
    const diceRoll = DiceService.roll([{ id: 1 } as YahtzeeDice]);
    expect(diceRoll[0].value).toEqual(1);
  });

  it("rolls a 6 when math.random is 0.9", async () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.9);
    const diceRoll = DiceService.roll([{ id: 1 } as YahtzeeDice]);
    expect(diceRoll[0].value).toEqual(6);
  });

  it("does not roll dice if dice is locked", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.0);
    const diceRoll = DiceService.roll([{ id: 1, value: 5, isLocked: true } as YahtzeeDice]);
    expect(diceRoll[0].value).toEqual(5);
  });
});
