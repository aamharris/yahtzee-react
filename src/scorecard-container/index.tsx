import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setMarkedScore } from "../game/gameSlice";
import Scorecard from "./Scorecard";
import { ScorecardRowData } from "../shared/types/scorecardRowData";

function ScorecardContainer() {
  const scorecard = useSelector((state: RootState) => state.scorecard);
  const dispatch = useDispatch();

  const onScoreMarked = (row: ScorecardRowData) => {
    dispatch(setMarkedScore(row.key));
  };

  return <Scorecard scorecard={scorecard} onScoreMarked={onScoreMarked} />;
}

export default ScorecardContainer;
