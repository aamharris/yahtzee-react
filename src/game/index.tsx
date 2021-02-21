import React, { useState } from "react";
import DiceContainer from "../dice-container";
import Scorecard, { ScorecardRowData, YahtzeeScorecard2 } from "../scorecard";
import { MAX_ROLL_PER_ROUND, MAX_ROUND_COUNT, MIN_UPPER_TOTAL_FOR_BONUS, UPPER_SECTION_BONUS } from "../constants";
import createNewScorecard from "../scorecard/scorecardManager";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ScorecardCalculator from "./ScorecardCalculator";
import ScoringCategories from "../scorecard/scoringCategories";
import RollContainer from "../roll-container";
import { DiceService } from "../dice-service";
import GameOverDialog from "../dialogs/GameOver";

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
  const [gameOverDialogOpen, setGameOverDialogOpen] = useState<boolean>(false);

  function onRollClicked() {
    const rolledDice = DiceService.roll(dice);
    setDice(rolledDice);
    setCurrentRollCount(currentRollCount + 1);
    setCanSelectScore(true);
    setScorecard(ScorecardCalculator.calculatePossibleScores(scorecard, rolledDice));
  }

  const onDiceClicked = (selectedDice: YahtzeeDice) => {
    let diceCopy = dice.slice();
    diceCopy[selectedDice.id].isLocked = !diceCopy[selectedDice.id].isLocked;
    setDice(diceCopy);
  };

  const isUpperSectionCategory = (category: ScoringCategories): boolean => {
    return (
      category === ScoringCategories.aces ||
      category === ScoringCategories.twos ||
      category === ScoringCategories.threes ||
      category === ScoringCategories.fours ||
      category === ScoringCategories.fives ||
      category === ScoringCategories.sixes
    );
  };

  const startNewGame = (): void => {
    setGameOverDialogOpen(false);
    setScorecard(createNewScorecard());
    setGameRound(1);
    setCurrentRollCount(0);
    setIsGameOver(false);
    setDice(initDice);
    setCanSelectScore(false);
  };

  const updateHighScore = (): void => {
    const prevHighScore = localStorage.getItem("highScore");
    if (!prevHighScore || parseInt(prevHighScore) < scorecard.totalScore) {
      localStorage.setItem("highScore", scorecard.totalScore.toString());
    }
  };

  const hasMinTotalForBonus = (): boolean => {
    return (
      scorecard.upperSection.reduce((a, b) => a + (b.markedScore !== undefined ? b.markedScore : 0), 0) >=
      MIN_UPPER_TOTAL_FOR_BONUS
    );
  };

  const onScorecardMarked = (row: ScorecardRowData) => {
    if (canSelectScore) {
      row.markedScore = row.possibleScore;
      scorecard.totalScore += row.markedScore as number;
    }

    if (scorecard.upperSectionBonus === 0 && isUpperSectionCategory(row.category) && hasMinTotalForBonus()) {
      scorecard.upperSectionBonus = UPPER_SECTION_BONUS;
      scorecard.totalScore += scorecard.upperSectionBonus;
    }

    setScorecard({ ...scorecard });
    setCanSelectScore(false);

    if (gameRound === MAX_ROUND_COUNT) {
      setIsGameOver(true);
      updateHighScore();
      setGameOverDialogOpen(true);
    } else {
      setCurrentRollCount(0);
      setGameRound(gameRound + 1);
      setDice(initDice);
    }
  };

  return (
    <>
      <Container maxWidth={"xs"}>
        <Box py={2} display={"flex"} justifyContent={"space-between"} alignContent={"center"}>
          <Typography variant="h4">Yahtzee</Typography>
          <Button variant={"outlined"} onClick={startNewGame}>
            New Game
          </Button>
        </Box>
        <Box>
          <div>High Score: {localStorage.getItem("highScore") ?? 0}</div>
          <div>Round {gameRound} / 13</div>
          <Box py={1}>
            <Scorecard scorecard={scorecard} onScoreMarked={onScorecardMarked} />
          </Box>
          <Box>
            <DiceContainer dice={dice} onDiceClicked={onDiceClicked} />
            <RollContainer
              currentRollCount={currentRollCount}
              canRollDice={currentRollCount !== MAX_ROLL_PER_ROUND && !isGameOver}
              onRollClicked={() => onRollClicked()}
            />
          </Box>

          {isGameOver && "Game Over!"}
        </Box>
      </Container>
      <GameOverDialog open={gameOverDialogOpen} totalScore={scorecard.totalScore} onClose={startNewGame} />
    </>
  );
}

export default Game;
