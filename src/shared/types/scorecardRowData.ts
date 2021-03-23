import ScoringCategories from "./scoringCategories";

export type ScorecardRowData = {
  key: string;
  category: ScoringCategories;
  possibleScore?: number;
  markedScore?: number;
};
