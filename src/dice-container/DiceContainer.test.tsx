import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import DiceContainer from '.';
import { YahtzeeDice } from '../App';

describe('DiceContainer', () => {
    describe('Dice', () => {
        const renderDiceContainer = (dice: YahtzeeDice[]) => {
            render(<DiceContainer dice={dice}
                onDiceRolled={jest.fn()}
                onDiceClicked={jest.fn()}
                canRollDice={true} />);
        }
        
        it('displays all dice values', () => {
            const dice: YahtzeeDice[] = [
                { id: 1, value: 1, isLocked: false },
                { id: 2, value: 2, isLocked: false },
            ]

            renderDiceContainer(dice);
            expect(screen.getByText("1")).toBeInTheDocument();
            expect(screen.getByText("2")).toBeInTheDocument();
        });

        it('displays empty dice value when dice value is undefined', () => {
            const dice: YahtzeeDice[] = [
                { id: 1, value: undefined, isLocked: false },
            ]

            renderDiceContainer(dice);
            expect(screen.getByText("-")).toBeInTheDocument();
        });

        it('highlights locked dice', () => {
            const dice: YahtzeeDice[] = [
                { id: 1, value: undefined, isLocked: true },
            ]

            renderDiceContainer(dice);
            expect(screen.getByTestId('dice-1')).toHaveStyle('border: 1px solid yellow');
        })
    })

    describe('roll dice', () => {
        const onRollClicked = jest.fn();

        const createDiceWithValue = (value: number | undefined, isLocked: boolean = false): YahtzeeDice => {
            return { id: 1, value: value, isLocked: isLocked };
        }

        const renderDiceContainer = (dice: YahtzeeDice): void => {
            render(<DiceContainer
                dice={[dice]}
                onDiceRolled={onRollClicked}
                onDiceClicked={() => { }}
                canRollDice={true}
            />);
        }

        beforeEach(() => {
            jest.resetAllMocks();
        });

        it('rolls a 1 when math.random is 0', async () => {
            let dice = createDiceWithValue(undefined);
            jest.spyOn(global.Math, 'random').mockReturnValue(0.0);
            renderDiceContainer(dice);
            fireEvent.click(screen.getByRole('button', { name: 'Roll' }));
            expect(onRollClicked).toBeCalledWith([{ ...dice, value: 1 }])
        });

        it('rolls a 6 when math.random is 0.9', async () => {
            let dice = createDiceWithValue(undefined);
            jest.spyOn(global.Math, 'random').mockReturnValue(0.9);
            renderDiceContainer(dice);
            fireEvent.click(screen.getByRole('button', { name: 'Roll' }));
            expect(onRollClicked).toBeCalledWith([{ ...dice, value: 6 }])
        });

        it('does not roll dice if dice is locked', () => {
            let dice = createDiceWithValue(2, true);
            jest.spyOn(global.Math, 'random').mockReturnValue(0.0);
            renderDiceContainer(dice);
            fireEvent.click(screen.getByRole('button', { name: 'Roll' }));
            expect(onRollClicked).toBeCalledWith([{ ...dice, value: 2 }])
        });
    });
})