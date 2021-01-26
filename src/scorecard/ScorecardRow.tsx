type ScorecardRowProps = {
    title: string,
    score?: number,
    possibleScore?: number,
}

function ScorecardRow({ title, score, possibleScore }: ScorecardRowProps) {
    return (
        <tr>
            <td>{title}</td>
            <td>{score ? score : possibleScore}</td>
        </tr>
    );
}

export default ScorecardRow;