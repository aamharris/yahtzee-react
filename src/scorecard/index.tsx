import React, { useEffect, useState } from 'react';
import { YahtzeeDice } from '../App';
import { FULL_HOUSE_SCORE, LG_STRAIGHT_SCORE, SM_STRAIGHT_SCORE, YAHTZEE_SCORE } from '../constants';
import ScorecardRow from './ScorecardRow';

interface Score {
    possibleScore?: number,
    markedScore?: number
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
    yahtzeeBonus: Score;

    constructor() {
        this.aces = { possibleScore: undefined, markedScore: undefined}
        this.twos = { possibleScore: undefined, markedScore: undefined}
        this.threes = { possibleScore: undefined, markedScore: undefined}
        this.fours = { possibleScore: undefined, markedScore: undefined}
        this.fives = { possibleScore: undefined, markedScore: undefined}
        this.sixes = { possibleScore: undefined, markedScore: undefined}
        this.threeOfAKind = { possibleScore: undefined, markedScore: undefined}
        this.fourOfAKind = { possibleScore: undefined, markedScore: undefined}
        this.fullHouse = { possibleScore: undefined, markedScore: undefined}
        this.smallStraight = { possibleScore: undefined, markedScore: undefined}
        this.largeStraight = { possibleScore: undefined, markedScore: undefined}
        this.yahtzee = { possibleScore: undefined, markedScore: undefined}
        this.chance = { possibleScore: undefined, markedScore: undefined}
        this.yahtzeeBonus = { possibleScore: undefined, markedScore: undefined}
    }
}

type ScorecardProps = {
    dice: YahtzeeDice[];
}

export default function Scorecard({ dice }: ScorecardProps) {
    const [scores, setScores] = useState(new YahtzeeScorecard())

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

    function calculatePossibleScores(dice: YahtzeeDice[]) {
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
                <ScorecardRow title={'Aces'} score={undefined} possibleScore={scores.aces.possibleScore} />
                <ScorecardRow title={'Twos'} score={undefined} possibleScore={scores.twos.possibleScore} />
                <ScorecardRow title={'Threes'} score={undefined} possibleScore={scores.threes.possibleScore} />
                <ScorecardRow title={'Fours'} score={undefined} possibleScore={scores.fours.possibleScore} />
                <ScorecardRow title={'Fives'} score={undefined} possibleScore={scores.fives.possibleScore} />
                <ScorecardRow title={'Sixes'} score={undefined} possibleScore={scores.sixes.possibleScore} />
                <ScorecardRow title={'BONUS'} score={undefined} possibleScore={undefined} />
            </tbody>
            <thead>
            <tr>
                <th>Lower Section</th>
            </tr>
            </thead>
            <tbody>
                <ScorecardRow title={'3 of a Kind'} score={undefined} possibleScore={scores.threeOfAKind.possibleScore} />
                <ScorecardRow title={'4 of a Kind'} score={undefined} possibleScore={scores.fourOfAKind.possibleScore} />
                <ScorecardRow title={'Full House'} score={undefined} possibleScore={scores.fullHouse.possibleScore} />
                <ScorecardRow title={'Sm. Straight'} score={undefined} possibleScore={scores.smallStraight.possibleScore} />
                <ScorecardRow title={'Lg. Straight'} score={undefined} possibleScore={scores.largeStraight.possibleScore} />
                <ScorecardRow title={'Chance'} score={undefined} possibleScore={scores.chance.possibleScore} />
                <ScorecardRow title={'YAHTZEE'} score={undefined} possibleScore={scores.yahtzee.possibleScore} />
                <ScorecardRow title={'Yahtzee Bonus!'} score={undefined} possibleScore={0} />
            </tbody>          
        </table>
    )
}