import { YahtzeeDice } from "../App"

type DiceContainerProps = {
    dice: YahtzeeDice[],
    onDiceChanged: (dice: YahtzeeDice[]) => void;
}

export default function DiceContainer({dice, onDiceChanged}: DiceContainerProps) {
    const rollDice = (): void => {
        const diceRoll: YahtzeeDice[] = dice.map((d) => {
            d.value = Math.floor(Math.random() * (6 - 1 + 1) + 1);
            return d;
        });
        console.log(diceRoll);

        onDiceChanged(diceRoll)
    }
    
    return <div style={{display: 'flex'}}>
        { dice.map((d: YahtzeeDice) => {
            return <div key={d.id}>{d.value ?? '-'}</div>
        })}       
        <button onClick={rollDice}>Roll</button>
    </div>
}