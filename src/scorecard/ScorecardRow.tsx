import { ScorecardRowData } from ".";

type ScorecardRowProps = {
  scorecardRowData: ScorecardRowData;
  onScoreClicked: (row: ScorecardRowData) => void;
};

function ScorecardRow({ scorecardRowData, onScoreClicked }: ScorecardRowProps) {
  const { category, markedScore, possibleScore } = scorecardRowData;
  return (
    <tr>
      <td>{category}</td>
      <td style={{ cursor: "pointer" }}>
        {markedScore !== undefined ? (
          markedScore
        ) : (
          <span onClick={() => onScoreClicked(scorecardRowData)} style={{ color: "lightgray" }}>
            {possibleScore}
          </span>
        )}
      </td>
    </tr>
  );
}

export default ScorecardRow;
