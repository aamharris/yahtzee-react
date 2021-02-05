import React, { useState } from "react";
import "./Game.css";
import DiceContainer from "./dice-container";
import Scorecard, { YahtzeeScorecard2 } from "./scorecard";
import { MAX_ROLL_PER_ROUND, MAX_ROUND_COUNT } from "./constants";
import { createNewScorecard } from "./scorecard/scorecardManager";

export interface YahtzeeDice {
  id: number;
  isLocked: boolean;
  value?: number;
}

function Game() {
  let initDice: YahtzeeDice[] = new Array(5);
  for (var i = 0; i < initDice.length; i++) {
    initDice[i] = { id: i, isLocked: false, value: undefined };
  }

  const [dice, setDice] = useState<YahtzeeDice[]>(initDice);
  const [scorecard, setScorecard] = useState<YahtzeeScorecard2>(createNewScorecard());
  const [gameRound, setGameRound] = useState<number>(1);
  const [currentRollCount, setCurrentRollCount] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [canSelectScore, setCanSelectScore] = useState<boolean>(false);

  function onDiceRolled(dice: YahtzeeDice[]) {
    setDice([...dice]);
    setCurrentRollCount(currentRollCount + 1);
    setCanSelectScore(true);
  }

  const onScorecardChanged = (updatedScorecard: YahtzeeScorecard2) => {
    setScorecard(updatedScorecard);
  };

  const onDiceClicked = (selectedDice: YahtzeeDice) => {
    let diceCopy = dice.slice();
    diceCopy[selectedDice.id].isLocked = !diceCopy[selectedDice.id].isLocked;
    setDice(diceCopy);
  };

  const setNextRound = () => {
    setCanSelectScore(false);
    if (gameRound === MAX_ROUND_COUNT) {
      setIsGameOver(true);
    } else {
      setCurrentRollCount(0);
      setGameRound(gameRound + 1);
      setDice(initDice);
    }
  };

  return (
    <div>
      <div>Round {gameRound} / 13</div>
      <Scorecard
        dice={dice}
        scorecard={scorecard}
        onScoreMarked={setNextRound}
        onScorecardChanged={onScorecardChanged}
        canSelectScore={canSelectScore}
      />
      <DiceContainer
        dice={dice}
        onDiceClicked={onDiceClicked}
        canRollDice={currentRollCount !== MAX_ROLL_PER_ROUND && !isGameOver}
        onDiceRolled={onDiceRolled}
      />
      {isGameOver && "Game Over!"}
    </div>
  );
}

export default Game;
