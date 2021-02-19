import { YahtzeeScorecard2 } from ".";
import ScoringCategories from "./scoringCategories";

export default function createNewScorecard(): YahtzeeScorecard2 {
  return {
    upperSection: [
      { category: ScoringCategories.aces },
      { category: ScoringCategories.twos },
      { category: ScoringCategories.threes },
      { category: ScoringCategories.fours },
      { category: ScoringCategories.fives },
      { category: ScoringCategories.sixes },
    ],
    lowerSection: [
      { category: ScoringCategories.threeOfAKind },
      { category: ScoringCategories.fourOfAKind },
      { category: ScoringCategories.fullHouse },
      { category: ScoringCategories.smallStraight },
      { category: ScoringCategories.largeStraight },
      { category: ScoringCategories.chance },
      { category: ScoringCategories.yahtzee },
    ],
    totalScore: 0,
    upperSectionBonus: 0,
  };
}
