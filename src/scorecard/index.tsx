import React, { useEffect, useState } from 'react';
import { YahtzeeDice } from '../App';
import { FULL_HOUSE_SCORE, LG_STRAIGHT_SCORE, SM_STRAIGHT_SCORE, YAHTZEE_SCORE } from '../constants';
import ScorecardRow from './ScorecardRow';

export interface Score {
    possibleScore?: number,
    markedScore?: number,
    category: string,
}

enum ScoringCategory {
    aces = 'Aces',
    twos = 'Twos',
    threes = 'Threes',
    fours = 'Fours',
    fives = 'Fives',
    sixes = 'Sixes',
    threeOfAKind = '3 of a Kind',
    fourOfAKind = '4 of a Kind',
    fullHouse = 'Full House',
    smallStraight = 'Sm. Straight',
    largeStraight = 'Lg. Straight',
    chance = 'Chance',
    yahtzee = 'YAHTZEE',
}

export class YahtzeeScorecard {
    aces: Score;
    twos: Score;
    threes: Score;
    fours: Score;
    fives: Score;
    sixes: Score;
    threeOfAKind: Score;
    fourOfAKind: Score;
    fullHouse: Score;
    smallStraight: Score;
    largeStraight: Score;
    chance: Score;
    yahtzee: Score;

    constructor() {
        this.aces = { category: ScoringCategory.aces } as Score
        this.twos = { category: ScoringCategory.twos } as Score
        this.threes = { category: ScoringCategory.threes } as Score
        this.fours = { category: ScoringCategory.fours } as Score
        this.fives = { category: ScoringCategory.fives } as Score
        this.sixes = { category: ScoringCategory.sixes } as Score
        this.threeOfAKind =  { category: ScoringCategory.threeOfAKind } as Score
        this.fourOfAKind = { category: ScoringCategory.fourOfAKind } as Score
        this.fullHouse =  { category: ScoringCategory.fullHouse } as Score
        this.smallStraight =  { category: ScoringCategory.smallStraight } as Score
        this.largeStraight =  { category: ScoringCategory.largeStraight } as Score
        this.chance =  { category: ScoringCategory.chance } as Score
        this.yahtzee = { category: ScoringCategory.yahtzee } as Score
    }
}

type ScorecardProps = {
    dice: YahtzeeDice[];
}

export default function Scorecard({ dice }: ScorecardProps) {
    const [scores, setScores] = useState(new YahtzeeScorecard())
    const [selectedScore, setSelectedScore] = useState<Score | null>(null)

    let totalCountOfDiceByValue: Map<number, number>;

    useEffect(() => {
        calculatePossibleScores(dice);
    }, [dice]);

    const getSumOfDiceWithTheNumber = (number: number): number => {
        if (totalCountOfDiceByValue.has(number)) {
            return totalCountOfDiceByValue.get(number) as number * number;
        }
        return 0;
    }

    const hasFullHouse = (): boolean => {
        return totalCountOfDiceByValue.size === 2 && (totalCountOfDiceByValue.values().next().value === 3 ||  
        totalCountOfDiceByValue.values().next().value === 2);
    }
    
    const hasNumberOfSameDice = (number: number): boolean => {
        return Array.from(totalCountOfDiceByValue.values()).filter((v) => v >= number ).length > 0;
    }

    const hasSmallStraight = (): boolean => {
        let consectiveCount = 0;
        Array.from(totalCountOfDiceByValue.keys()).sort((a, b) => b - a).map((currentNumber, idx, arr) => {
            if (idx !== arr.length && currentNumber - arr[idx + 1] === 1) {
                consectiveCount += 1;
            }
        });

        return consectiveCount === 3;
    }

    const getDiceTotal = (): number => {        
        return Array.from(totalCountOfDiceByValue).reduce((total, kv) => {
            return total + (kv[0] * kv[1])
        }, 0)
    }

    const updateScorecardRow = (row: Score, updateFunc: Function): void => {
        if (!row.markedScore) {
            row.possibleScore = updateFunc();
        }
    }

    const isRowSelected = (score: Score): boolean => {
        return selectedScore?.category == score.category;
    }

    const calculatePossibleScores = (dice: YahtzeeDice[]): void => {
        totalCountOfDiceByValue = new Map<number, number>();
        dice.forEach((d) => {
            if (d.value) {
                if (totalCountOfDiceByValue.has(d.value)) {
                    totalCountOfDiceByValue.set(d.value, totalCountOfDiceByValue.get(d.value) as number + 1);
                } else {
                    totalCountOfDiceByValue.set(d.value, 1);
                }
            }           
        });

        let scorecard: YahtzeeScorecard = {...scores};

        const diceTotal = getDiceTotal();

        updateScorecardRow(scorecard.aces, () => getSumOfDiceWithTheNumber(1));
        updateScorecardRow(scorecard.twos, () => getSumOfDiceWithTheNumber(2));
        updateScorecardRow(scorecard.threes, () => getSumOfDiceWithTheNumber(3));
        updateScorecardRow(scorecard.fours, () => getSumOfDiceWithTheNumber(4));
        updateScorecardRow(scorecard.fives, () => getSumOfDiceWithTheNumber(5));
        updateScorecardRow(scorecard.sixes, () => getSumOfDiceWithTheNumber(6));

        updateScorecardRow(scorecard.fullHouse, () => hasFullHouse() ? FULL_HOUSE_SCORE : 0);
        updateScorecardRow(scorecard.smallStraight, () => hasSmallStraight() ? SM_STRAIGHT_SCORE : 0);
        updateScorecardRow(scorecard.largeStraight, () => totalCountOfDiceByValue.size === 5 ? LG_STRAIGHT_SCORE : 0);
        updateScorecardRow(scorecard.threeOfAKind, () =>  hasNumberOfSameDice(3) ? diceTotal : 0);
        updateScorecardRow(scorecard.fourOfAKind, () => hasNumberOfSameDice(4) ? diceTotal : 0);
        updateScorecardRow(scorecard.chance, () => diceTotal);
        updateScorecardRow(scorecard.yahtzee, () => hasNumberOfSameDice(5) ? YAHTZEE_SCORE : 0);
        setScores(scorecard);
    }

    return (
        <table style={{ width: '200px' }}>
            <thead>
            <tr>
                <th>Upper Section</th>
            </tr>
            </thead>
            <tbody>
                <ScorecardRow score={scores.aces} onScoreSelected={setSelectedScore} isSelected={isRowSelected(scores.aces)} />
                <ScorecardRow score={scores.twos} onScoreSelected={setSelectedScore} isSelected={isRowSelected(scores.twos)} />
                <ScorecardRow score={scores.threes} onScoreSelected={setSelectedScore} isSelected={isRowSelected(scores.threes)} />
                <ScorecardRow score={scores.fours} onScoreSelected={setSelectedScore} isSelected={isRowSelected(scores.fours)} />
                <ScorecardRow score={scores.fives} onScoreSelected={setSelectedScore} isSelected={isRowSelected(scores.fives)} />
                <ScorecardRow score={scores.sixes} onScoreSelected={setSelectedScore} isSelected={isRowSelected(scores.sixes)} />              
            </tbody>
            <thead>
            <tr>
                <th>Lower Section</th>
            </tr>
            </thead>
            <tbody>
                <ScorecardRow score={scores.threeOfAKind} onScoreSelected={setSelectedScore} />
                <ScorecardRow score={scores.fourOfAKind} onScoreSelected={setSelectedScore} />
                <ScorecardRow score={scores.fullHouse} onScoreSelected={setSelectedScore} />
                <ScorecardRow score={scores.smallStraight} onScoreSelected={setSelectedScore} />
                <ScorecardRow score={scores.largeStraight} onScoreSelected={setSelectedScore} />
                <ScorecardRow score={scores.chance} onScoreSelected={setSelectedScore} />
                <ScorecardRow score={scores.yahtzee} onScoreSelected={setSelectedScore} />
            </tbody>          
        </table>
    )

}