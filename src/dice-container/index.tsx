import { YahtzeeDice } from "../App"

type DiceContainerProps = {
    dice: YahtzeeDice[],
    canRollDice: boolean;
    onDiceRolled: (dice: YahtzeeDice[]) => void;
    onDiceClicked: (selectedDice: YahtzeeDice) => void;
}

export default function DiceContainer({ dice, canRollDice, onDiceRolled, onDiceClicked }: DiceContainerProps) {
    const rollDice = (): void => {
        const diceRoll: YahtzeeDice[] = dice.map((d) => {
            if (!d.isLocked) {
                d.value = Math.floor(Math.random() * (6) + 1);
            }

            return d;
        });

        onDiceRolled(diceRoll)
    }

    return <div style={{ display: 'flex' }}>
        {dice.map((d: YahtzeeDice) => {
            return <div
                key={d.id}
                data-testid={`dice-${d.id}`}
                onClick={() => onDiceClicked(d)}
                style={{ width: '30px', height: '30px', border: `1px solid ${d.isLocked ? 'yellow' : 'gray'}` }}>
                {d.value ?? '-'}
            </div>
        })}
        <button onClick={rollDice} disabled={!canRollDice}>Roll</button>
    </div>
}