import {useState} from 'react'

import Boardbattle from "../boardbattle/boardbattle"

import {generateRandomLocs} from "./randomLocs"

import "./battlefield.scss"

const shipsLocations = generateRandomLocs()

const carrierA = shipsLocations[0] === shipsLocations[1] - 1 ? "x" : "y" 
const batteshipA = shipsLocations[5] === shipsLocations[6] - 1 ? "x" : "y" 
const destroyerA = shipsLocations[9] === shipsLocations[10] - 1 ? "x" : "y" 
const submarineA = shipsLocations[12] === shipsLocations[13] - 1 ? "x" : "y" 
const patrolA = shipsLocations[15] === shipsLocations[16] - 1 ? "x" : "y" 

const Battlefield = ({shipsStartPosition}) => {
    const [aiStartPosition, setAiStartPositions] = useState({
        carrier: {start: shipsLocations[0], axis: carrierA},
        battleship: {start: shipsLocations[5], axis: batteshipA},
        destroyer: {start: shipsLocations[9], axis: destroyerA},
        submarine: {start: shipsLocations[12], axis: submarineA},
        patrol: {start: shipsLocations[15], axis: patrolA}
      })

    return (
        <div className="boards-battle-container">
            <Boardbattle shipsStartPosition={shipsStartPosition}/>
            <Boardbattle shipsStartPosition={aiStartPosition}/>
        </div>
    )
}

export default Battlefield
