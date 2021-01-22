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
  const [rollCount, setRollCount] = useState<number>(0);

  const resetRollCount = () => {
    setRollCount(0);
  }

  return (
    <div>
      <Scorecard />
      <DiceContainer dice={dice} 
        onDiceRolled={(allDice) => {
          setDice(allDice);
          let currentRoll = rollCount + 1;          
          setRollCount(currentRoll);   
        }}
        canRollDice={rollCount !== 3}
        onDiceClicked={(selectedDice) => {
          let diceCopy = dice.slice();
          diceCopy[selectedDice.id].isLocked = !diceCopy[selectedDice.id].isLocked;
          setDice(diceCopy);         
      }} />
      <div>
        <div>Roll</div>
        <div style={{display: 'flex'}}>
          <div style={{color: rollCount === 1 ? 'red' : 'gray'}}>1</div>
          <div style={{color: rollCount === 2 ? 'red' : 'gray'}}>2</div> 
          <div style={{color: rollCount === 3 ? 'red' : 'gray'}}>3</div>
        </div>
        <button onClick={resetRollCount}>Reset</button>
      </div>
    </div>
  );
}

export default App;
