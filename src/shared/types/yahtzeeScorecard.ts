import { ScorecardSection } from "./scorecardSection";

export type YahtzeeScorecard = {
  upperSection: ScorecardSection;
  lowerSection: ScorecardSection;
  upperSectionBonus: number;
  totalScore: number;
};
