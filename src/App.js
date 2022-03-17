import logo from './logo.svg';
import './App.css';
import './styles.css';
import Die from './components/Die';
import React from 'react';
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import { clear } from '@testing-library/user-event/dist/clear';
  
function App() {

  const generateNewDice = () => {
    return {value: Math.round(Math.random()*6),
       isHeld: false,
        id: nanoid()};
  }

  // randomly generates the number on dice b/w 1 to 6
  const allNewDice = () => {
    const arr = []
    for(let i = 0; i < 10; i++){
      arr.push(generateNewDice())
    }
    return arr
  }

  //state to update and store the numbers on dice
  const [dice, updatedice] = React.useState(allNewDice())
  //checks weather game is won or not
  const [tenzies, setTenzies] = React.useState(false)
  //count the number of times roll button is clicked
  const [counter, changeCounter] = React.useState(0)
  // const [time, setTime] = React.useState({m: 0, s: 0})
 

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue){
      setTenzies(true)
      // console.log(("You won!"));
    }
  },[dice])

  const holdDice = (id) => {
    updatedice(olddice => olddice.map(die => {
      return die.id === id ? {...die, isHeld:!die.isHeld} : die
    }))
  }

  //shuffle dice value after each click on the roll button
  const shuffle = () =>{
    // window.location.reload(true)  --> this will reload the whole window
    // updatedice(allNewDice())
    if(tenzies){
      updatedice(allNewDice())
      setTenzies(false)
      changeCounter(0)
    }else{
      updatedice(oldDice => 
        oldDice.map(die => {
          return die.isHeld ? die : generateNewDice()
        })
      )
      changeCounter(oldValue => oldValue+1)
      // run()
      // const id = setInterval(run, 1000)
    }
  }

  const dieElements = dice.map(die => <Die key={die.id}
    value={die.value}
    isHeld={die.isHeld} 
    holdDice={() => holdDice(die.id)}></Die>)

    // var updatedM = time.m , updatedS = time.s

    // const run = () => {
    //   if(updatedS >= 60){
    //     updatedM++
    //     updatedS = 0
    //   }
    //   updatedS++;
    //   return setTime({m: updatedM, s: updatedS})
    // }

  return (
    <main>
      {/* <div className='timer-container'>
        <span>{(time.m >= 10) ? time.m : '0' + time.m}</span>
        <span className='colon'>:</span>
        <span>{(time.s >= 10) ? time.s : '0' + time.s}</span>
      </div> */}
      <h1 className='title'>Tenzies</h1>
      <p className='description'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='die-container'>
        {dieElements}
      </div>
      <button className='roll-btn' onClick={shuffle}>{tenzies ? "New Game": "Roll"}</button>
      {tenzies && <Confetti/>}
      <div>
        <h3>Number of times dices are rolled: {counter}</h3>
      </div>
    </main>
  );
}

export default App;
