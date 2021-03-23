import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MAX_ROLL_PER_ROUND, MAX_ROUND_COUNT, MIN_UPPER_TOTAL_FOR_BONUS, UPPER_SECTION_BONUS } from "../constants";
import { createNewScorecard, setPossibleScores } from "../scorecard-container/scorecardManager";
import { ScorecardSection } from "../shared/types/scorecardSection";
import { YahtzeeDice } from "../shared/types/yahtzeeDice";
import { YahtzeeScorecard } from "../shared/types/yahtzeeScorecard";

type GameState = {
  dice: YahtzeeDice[];
  currentRollCount: number;
  canRollDice: boolean;
  scorecard: YahtzeeScorecard;
  canSelectScore: boolean;
  gameRound: number;
  isGameOver: boolean;
};

const initDice: YahtzeeDice[] = new Array(5);
for (var i = 0; i < initDice.length; i++) {
  initDice[i] = { id: i, isLocked: false, value: undefined };
}

const initialState: GameState = {
  dice: initDice,
  currentRollCount: 0,
  canRollDice: true,
  scorecard: createNewScorecard(),
  canSelectScore: false,
  gameRound: 1,
  isGameOver: false,
};

const hasMinTotalForBonus = (upperSection: ScorecardSection): boolean => {
  return (
    Object.values(upperSection).reduce((a, b) => a + (b.markedScore !== undefined ? b.markedScore : 0), 0) >=
    MIN_UPPER_TOTAL_FOR_BONUS
  );
};

//TODO: Refactor this to be persisted in redux state/local storage
const updateHighScore = (score: number): void => {
  const prevHighScore = localStorage.getItem("highScore");
  if (!prevHighScore || parseInt(prevHighScore) < score) {
    localStorage.setItem("highScore", score.toString());
  }
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    rollDice: (state) => {
      state.dice = state.dice.map(({ ...d }: YahtzeeDice) => {
        if (!d.isLocked) {
          d.value = Math.floor(Math.random() * 6 + 1);
        }
        return d;
      });

      state.canSelectScore = true;
      state.currentRollCount += 1;
      if (state.currentRollCount === MAX_ROLL_PER_ROUND) {
        state.canRollDice = false;
      }

      setPossibleScores(state.scorecard, state.dice);
    },
    toggleDiceLocked: (state, action: PayloadAction<YahtzeeDice>) => {
      if (state.canSelectScore) {
        const selectedDice = state.dice.find((d) => d.id === action.payload.id);
        if (selectedDice) {
          selectedDice.isLocked = !selectedDice?.isLocked;
        }
      }
    },
    startNewGame: (state) => {
      state.dice = initDice;
      state.scorecard = createNewScorecard();
      state.gameRound = 1;
      state.currentRollCount = 0;
      state.isGameOver = false;
    },
    setMarkedScore: (state, action: PayloadAction<string>) => {
      if (state.canSelectScore) {
        const isUpperSection = action.payload in state.scorecard.upperSection;
        const selectedRow = isUpperSection
          ? state.scorecard.upperSection[action.payload]
          : state.scorecard.lowerSection[action.payload];
        selectedRow.markedScore = selectedRow.possibleScore;
        state.scorecard.totalScore += selectedRow.markedScore as number;
        state.canSelectScore = false;

        if (
          state.scorecard.upperSectionBonus === 0 &&
          isUpperSection &&
          hasMinTotalForBonus(state.scorecard.upperSection)
        ) {
          state.scorecard.upperSectionBonus = UPPER_SECTION_BONUS;
          state.scorecard.totalScore += state.scorecard.upperSectionBonus;
        }

        if (state.gameRound === MAX_ROUND_COUNT) {
          state.isGameOver = true;
          updateHighScore(state.scorecard.totalScore);
        } else {
          state.currentRollCount = 0;
          state.gameRound = state.gameRound + 1;
          state.dice = initDice;
        }
      }
    },
  },
});

export const { rollDice, toggleDiceLocked, setMarkedScore, startNewGame } = gameSlice.actions;

export default gameSlice.reducer;
