import React, { useEffect, useState } from 'react';
import { YahtzeeDice } from '../App';
import { FULL_HOUSE_SCORE, LG_STRAIGHT_SCORE, SM_STRAIGHT_SCORE, YAHTZEE_SCORE } from '../constants';
import ScorecardRow from './ScorecardRow';

export type YahtzeeScorecard = {
    upperSection: {
        aces?: number,
        twos?: number,
        threes?: number,
        fours?: number,
        fives?: number,
        sixes?: number,
    },
    lowerSection: {
        threeOfAKind?: number,
        fourOfAKind?: number,
        fullHouse?: number,
        smallStraight?: number,
        largeStraight?: number,
        yahtzee?: number,
        chance?: number,
        yahtzeeBonusCount?: number,
    }
}

type ScorecardProps = {
    dice: YahtzeeDice[];
}

export default function Scorecard({ dice }: ScorecardProps) {
    const [possibleScores, setPossibleScores] = useState(initializeScorecard())

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

        const diceTotal = getDiceTotal();

        possibleScores.upperSection.aces = getSumOfDiceWithTheNumber(1);
        possibleScores.upperSection.twos = getSumOfDiceWithTheNumber(2);
        possibleScores.upperSection.threes = getSumOfDiceWithTheNumber(3);
        possibleScores.upperSection.fours = getSumOfDiceWithTheNumber(4);
        possibleScores.upperSection.fives = getSumOfDiceWithTheNumber(5);
        possibleScores.upperSection.sixes = getSumOfDiceWithTheNumber(6);
        possibleScores.lowerSection.fullHouse = hasFullHouse() ? FULL_HOUSE_SCORE : 0;
        possibleScores.lowerSection.smallStraight = hasSmallStraight() ? SM_STRAIGHT_SCORE : 0;
        possibleScores.lowerSection.largeStraight = totalCountOfDiceByValue.size === 5 ? LG_STRAIGHT_SCORE : 0;
        possibleScores.lowerSection.threeOfAKind = hasNumberOfSameDice(3) ? diceTotal : 0;
        possibleScores.lowerSection.fourOfAKind = hasNumberOfSameDice(4) ? diceTotal : 0;
        possibleScores.lowerSection.chance = diceTotal;
        possibleScores.lowerSection.yahtzee = hasNumberOfSameDice(5) ? YAHTZEE_SCORE : 0;
        setPossibleScores({...possibleScores})
    }

    function initializeScorecard(): YahtzeeScorecard {    
        return {
            upperSection: { 
                aces: undefined,
                twos: undefined,
                threes: undefined,
                fours: undefined,
                fives: undefined,
                sixes: undefined,
            },
            lowerSection: {
                threeOfAKind: undefined,
                fourOfAKind: undefined,
                fullHouse: undefined,
                smallStraight: undefined,
                largeStraight: undefined,
                yahtzee: undefined,
                chance: undefined,
                yahtzeeBonusCount: undefined,
            }
        }
    }

    return (
        <table style={{ width: '200px' }}>
            <thead>
            <tr>
                <th>Upper Section</th>
            </tr>
            </thead>
            <tbody name="tbody">
                <ScorecardRow title={'Aces'} score={undefined} possibleScore={possibleScores.upperSection.aces} />
                <ScorecardRow title={'Twos'} score={undefined} possibleScore={possibleScores.upperSection.twos} />
                <ScorecardRow title={'Threes'} score={undefined} possibleScore={possibleScores.upperSection.threes} />
                <ScorecardRow title={'Fours'} score={undefined} possibleScore={possibleScores.upperSection.fours} />
                <ScorecardRow title={'Fives'} score={undefined} possibleScore={possibleScores.upperSection.fives} />
                <ScorecardRow title={'Sixes'} score={undefined} possibleScore={possibleScores.upperSection.sixes} />
                <ScorecardRow title={'BONUS'} score={undefined} possibleScore={possibleScores.lowerSection.chance} />
            </tbody>
            <thead>
            <tr>
                <th>Lower Section</th>
            </tr>
            </thead>
            <tbody>
                <ScorecardRow title={'3 of a Kind'} score={undefined} possibleScore={possibleScores.lowerSection.threeOfAKind} />
                <ScorecardRow title={'4 of a Kind'} score={undefined} possibleScore={possibleScores.lowerSection.fourOfAKind} />
                <ScorecardRow title={'Full House'} score={undefined} possibleScore={possibleScores.lowerSection.fullHouse} />
                <ScorecardRow title={'Sm. Straight'} score={undefined} possibleScore={possibleScores.lowerSection.smallStraight} />
                <ScorecardRow title={'Lg. Straight'} score={undefined} possibleScore={possibleScores.lowerSection.largeStraight} />
                <ScorecardRow title={'Chance'} score={undefined} possibleScore={possibleScores.lowerSection.chance} />
                <ScorecardRow title={'YAHTZEE'} score={undefined} possibleScore={possibleScores.lowerSection.yahtzee} />
                <ScorecardRow title={'Yahtzee Bonus!'} score={undefined} possibleScore={0} />
            </tbody>          
        </table>
    )
}