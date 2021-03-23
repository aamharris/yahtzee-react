import React, { useEffect, useState } from "react";
import DiceContainer from "../dice-container";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RollContainer from "../roll-container";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import ScorecardContainer from "../scorecard-container";
import { startNewGame } from "./gameSlice";
import GameOverDialog from "../dialogs/GameOver";

function Game() {
  const gameRound = useSelector((state: RootState) => state.gameRound);
  const gameOver = useSelector((state: RootState) => state.isGameOver);
  const totalScore = useSelector((state: RootState) => state.scorecard.totalScore);

  const dispatch = useDispatch();

  const onStartNewGame = () => {
    setGameOverDialogOpen(false);
    dispatch(startNewGame());
  };

  useEffect(() => {
    if (gameOver) {
      setGameOverDialogOpen(true);
    }
  }, [gameOver]);

  const [gameOverDialogOpen, setGameOverDialogOpen] = useState(false);

  return (
    <>
      <Container maxWidth={"xs"}>
        <Box py={2} display={"flex"} justifyContent={"space-between"} alignContent={"center"}>
          <Typography variant="h4">Yahtzee</Typography>
          <Button variant={"outlined"} onClick={() => onStartNewGame()}>
            New Game
          </Button>
        </Box>
        <Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <div>Round {gameRound} / 13</div>
            <div>High Score: {localStorage.getItem("highScore") ?? 0}</div>
          </Box>
          <Box py={1}>
            <ScorecardContainer />
          </Box>
          <Box>
            <DiceContainer />
            <RollContainer />
          </Box>
        </Box>
      </Container>
      <GameOverDialog open={gameOverDialogOpen} totalScore={totalScore} onClose={onStartNewGame} />
    </>
  );
}

export default Game;
