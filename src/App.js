import {useState} from "react"

import './App.css'

import Placement from "./Components/placement/placement"
import Battlefield from "./Components/battlefield/battlefield"

function App() {
  const [stage, setStage] = useState("placement")
  const [shipsStartPosition, setShipsStartPositions] = useState({
    carrier: {start: null, axis: ""},
    battleship: {start: null, axis: ""},
    destroyer: {start: null, axis: ""},
    submarine: {start: null, axis: ""},
    patrol: {start: null, axis: ""}
  })

  const [friendlyShipsLocations, setFriendlyShipsLocations] = useState([])

  return (
    <div className="App">
      <h1 className="header-title">BATTLESHIP</h1>
      {stage==="placement"&&<Placement friendlyShipsLocations={friendlyShipsLocations} setFriendlyShipsLocations={setFriendlyShipsLocations} shipsStartPosition={shipsStartPosition} setShipsStartPositions={setShipsStartPositions} setStage={setStage}/>}
      {stage==="battle"&&<Battlefield friendlyShipsLocations={friendlyShipsLocations} setStage={setStage} shipsStartPosition={shipsStartPosition}/>}
    </div>
  );
}

export default App