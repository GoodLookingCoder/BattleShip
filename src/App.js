import {useState} from "react"

import './App.css'

import Header from "./Components/header/header"
import Placement from "./Components/placement/placement"
import Battlefield from "./Components/battlefield/battlefield"
import Stats from "./Components/stats/stats"

console.log([1,2,3,5].filter(x => ![1,2,3,4].includes(x)))

function App() {
  const [stage, setStage] = useState("placement")
  const [shipsStartPosition, setShipsStartPositions] = useState({
    carrier: {start: null, axis: ""},
    battleship: {start: null, axis: ""},
    destroyer: {start: null, axis: ""},
    submarine: {start: null, axis: ""},
    patrol: {start: null, axis: ""}
  })
  const [winner, setWinner] = useState("")

  return (
    <div className="App">
      <Header />
      {stage==="placement"&&<Placement  shipsStartPosition={shipsStartPosition} setShipsStartPositions={setShipsStartPositions} setStage={setStage}/>}
      {stage==="battle"&&<Battlefield  setStage={setStage} setWinner={setWinner} shipsStartPosition={shipsStartPosition}/>}
      {stage==="stats"&&<Stats setStage={setStage} winner={winner}/>}
      </div>
  );
}

export default App