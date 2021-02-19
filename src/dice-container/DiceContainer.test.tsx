import React from "react";
import { render, screen, within } from "@testing-library/react";
import DiceContainer from ".";
import { YahtzeeDice } from "../game";
import DiceBuilder from "../testUtils/DiceBuilder";

describe("DiceContainer", () => {
  describe("Dice", () => {
    const renderDiceContainer = (dice: YahtzeeDice[]) => {
      render(<DiceContainer dice={dice} onDiceClicked={jest.fn()} />);
    };

    it("gets the correct dice image for the value", () => {
      var diceBuilder = new DiceBuilder();
      for (var i = 1; i <= 6; i++) {
        diceBuilder.addDice({ value: i, id: i });
      }

      const dice = diceBuilder.build();

      renderDiceContainer(dice);
      expect(within(screen.getByTestId("dice-1")).getByAltText("1")).toBeInTheDocument();
      expect(within(screen.getByTestId("dice-2")).getByAltText("2")).toBeInTheDocument();
      expect(within(screen.getByTestId("dice-3")).getByAltText("3")).toBeInTheDocument();
      expect(within(screen.getByTestId("dice-4")).getByAltText("4")).toBeInTheDocument();
      expect(within(screen.getByTestId("dice-5")).getByAltText("5")).toBeInTheDocument();
      expect(within(screen.getByTestId("dice-6")).getByAltText("6")).toBeInTheDocument();
    });

    it("does not display dice when dice value is undefined", () => {
      const dice: YahtzeeDice[] = [{ id: 1, value: undefined, isLocked: false }];

      renderDiceContainer(dice);
      expect(screen.getByTestId("dice-1")).toBeEmptyDOMElement();
    });

    it("highlights locked dice in red", () => {
      const dice: YahtzeeDice[] = [{ id: 1, value: 1, isLocked: true }];

      renderDiceContainer(dice);
      expect(screen.getByTestId("dice-1")).toHaveStyle("box-shadow: 0px 0px 3px 3px rgba(230,0,0,0.20)");
    });

    it("highlights unloced dice in gray", () => {
      const dice: YahtzeeDice[] = [{ id: 1, value: 1, isLocked: false }];

      renderDiceContainer(dice);
      expect(screen.getByTestId("dice-1")).toHaveStyle("box-shadow: 0px 0px 3px 3px rgba(0,0,0,0.20)");
    });
  });

  // describe("roll dice", () => {
  //   const onRollClicked = jest.fn();

  //   const createDiceWithValue = (value: number | undefined, isLocked: boolean = false): YahtzeeDice => {
  //     return { id: 1, value: value, isLocked: isLocked };
  //   };

  //   const renderDiceContainer = (dice: YahtzeeDice): void => {
  //     render(
  //       <DiceContainer
  //         dice={[dice]}
  //         currentRoundRollCount={1}
  //         onDiceRolled={onRollClicked}
  //         onDiceClicked={() => {}}
  //         canRollDice={true}
  //       />
  //     );
  //   };

  //   beforeEach(() => {
  //     jest.resetAllMocks();
  //   });

  //   it("rolls a 1 when math.random is 0", async () => {
  //     let dice = createDiceWithValue(undefined);
  //     jest.spyOn(global.Math, "random").mockReturnValue(0.0);
  //     renderDiceContainer(dice);
  //     fireEvent.click(screen.getByRole("button", { name: "Roll" }));
  //     expect(onRollClicked).toBeCalledWith([{ ...dice, value: 1 }]);
  //   });

  //   it("rolls a 6 when math.random is 0.9", async () => {
  //     let dice = createDiceWithValue(undefined);
  //     jest.spyOn(global.Math, "random").mockReturnValue(0.9);
  //     renderDiceContainer(dice);
  //     fireEvent.click(screen.getByRole("button", { name: "Roll" }));
  //     expect(onRollClicked).toBeCalledWith([{ ...dice, value: 6 }]);
  //   });

  //   it("does not roll dice if dice is locked", () => {
  //     let dice = createDiceWithValue(2, true);
  //     jest.spyOn(global.Math, "random").mockReturnValue(0.0);
  //     renderDiceContainer(dice);
  //     fireEvent.click(screen.getByRole("button", { name: "Roll" }));
  //     expect(onRollClicked).toBeCalledWith([{ ...dice, value: 2 }]);
  //   });
  // });
});
