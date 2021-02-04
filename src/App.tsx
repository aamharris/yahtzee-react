import React, { useEffect, useState } from 'react';
import './App.css';
import DiceContainer from './dice-container';
import Scorecard from './scorecard';

export interface YahtzeeDice {
  id: number;
  isLocked: boolean,
  value?: number
}

function App() {
  let initDice: YahtzeeDice[] = new Array(5)
  for (var i = 0; i < initDice.length; i++) {
    initDice[i] = { id: i, isLocked: false, value: undefined }
  }

  const [dice, setDice] = useState<YahtzeeDice[]>(initDice);

  function onDiceRolled(dice: YahtzeeDice[]) {
    setDice([...dice])
  }
  return (
    <div>
 <Scorecard dice={dice} />
 <DiceContainer dice={dice} onDiceClicked={() => {}} canRollDice={true} onDiceRolled={onDiceRolled} />
    </div>
 
  )

}

export default App;
