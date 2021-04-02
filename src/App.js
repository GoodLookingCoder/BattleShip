import {useState} from "react"

import './App.css'

import Placement from "./Components/placement/placement"
import Battlefield from "./Components/battlefield/battlefield"
import Stats from "./Components/stats/stats"

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
      <h1 className="header-title">BATTLESHIP</h1>
      {stage==="placement"&&<Placement  shipsStartPosition={shipsStartPosition} setShipsStartPositions={setShipsStartPositions} setStage={setStage}/>}
      {stage==="battle"&&<Battlefield  setStage={setStage} setWinner={setWinner} shipsStartPosition={shipsStartPosition}/>}
      {stage==="stats"&&<Stats setStage={setStage} winner={winner}/>}
      </div>
  );
}

export default App