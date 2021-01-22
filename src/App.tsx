import React, { useState } from 'react';
import './App.css';
import Scorecard from './scorecard';
import DiceContainer from './dice-container';

export interface YahtzeeDice {
  id: number;
  isLocked: boolean,
  value?: number
}

function App() {
  let initDice:YahtzeeDice[] = new Array(5)  

  for(var i = 0;i < initDice.length;i++) { 
    initDice[i] = { id: i, isLocked: false, value: undefined}
  }

  const [dice, setDice] = useState<YahtzeeDice[]>(initDice);


  return (
    <div>
      <Scorecard />
      <DiceContainer dice={dice} 
        onDiceRolled={(allDice) => {setDice(allDice)}} 
        onDiceClicked={(selectedDice) => {
          let diceCopy = dice.slice();
          diceCopy[selectedDice.id].isLocked = !diceCopy[selectedDice.id].isLocked;
          setDice(diceCopy);         
      }} />
    </div>
  );
}

export default App;
