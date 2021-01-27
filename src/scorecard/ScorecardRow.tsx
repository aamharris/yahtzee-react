import { Score } from ".";

type ScorecardRowProps = {
    score: Score,
    onScoreSelected: (currentScore: Score) => void
    isSelected?: boolean;
}

function ScorecardRow({ score, onScoreSelected, isSelected }: ScorecardRowProps) {
    const { category, possibleScore, markedScore } = score;
    return (
        <tr>
            <td>{category}</td>
            <td style={{cursor: 'pointer'}}>
                {markedScore ? markedScore : 
                <span onClick={() => onScoreSelected({...score})} style={{color: isSelected ? 'red' : 'lightgray'}}>{possibleScore}</span>}</td>
        </tr>
    );
}

export default ScorecardRow;