type ScorecardRowProps = {
    title: string,
    score?: number,
    possibleScore?: number,
}

function ScorecardRow({ title, score, possibleScore }: ScorecardRowProps) {
    return (
        <div style={{display: 'flex'}}>
            <div style={{flexGrow: 1,  flexBasis: '100%'}}>{title}</div>
            <div style={{flexGrow: 1, flexBasis: '100%'}}>{score ? score : possibleScore}</div>
        </div>
    );
}

export default ScorecardRow;