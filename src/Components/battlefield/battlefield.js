import {useState, useEffect} from 'react'

import Boardbattle from "../boardbattle/boardbattle"

import {generateRandomLocs} from "./randomLocs"

import "./battlefield.scss"

const shipsLocations = generateRandomLocs()

const carrierA = shipsLocations[0] === shipsLocations[1] - 1 ? "x" : "y" 
const batteshipA = shipsLocations[5] === shipsLocations[6] - 1 ? "x" : "y" 
const destroyerA = shipsLocations[9] === shipsLocations[10] - 1 ? "x" : "y" 
const submarineA = shipsLocations[12] === shipsLocations[13] - 1 ? "x" : "y" 
const patrolA = shipsLocations[15] === shipsLocations[16] - 1 ? "x" : "y" 

const carrierLocations = [shipsLocations[0], shipsLocations[1], shipsLocations[2], shipsLocations[3], shipsLocations[4]]
const battleshipLocations = [shipsLocations[5], shipsLocations[6], shipsLocations[7], shipsLocations[8]]
const destroyerLocations = [shipsLocations[9], shipsLocations[10], shipsLocations[11]]
const submarineLocations = [shipsLocations[12], shipsLocations[13], shipsLocations[14]]
const patrolLocations = [shipsLocations[15], shipsLocations[16]]

const carrierHits = []
const battleshipHits = []
const destroyerHits = []
const submarineHits = []
const patrolHits = []

const fcarrierHits = []
const fbattleshipHits = []
const fdestroyerHits = []
const fsubmarineHits = []
const fpatrolHits = []

const computerShots = []

const Battlefield = ({shipsStartPosition, friendlyShipsLocations}) => {
    const [aiStartPosition, setAiStartPositions] = useState({
        carrier: {start: shipsLocations[0], axis: carrierA},
        battleship: {start: shipsLocations[5], axis: batteshipA},
        destroyer: {start: shipsLocations[9], axis: destroyerA},
        submarine: {start: shipsLocations[12], axis: submarineA},
        patrol: {start: shipsLocations[15], axis: patrolA}
      })

    const [displayAiShips, setDisplayAiShips] = useState({
        carrier: false,
        battleship: false,
        destroyer: false,
        submarine: false,
        patrol: false
    })

    const [fireAi, setFireAi] = useState(null)

    const [fcarrierLocations] =useState([friendlyShipsLocations[0], friendlyShipsLocations[1], friendlyShipsLocations[2], friendlyShipsLocations[3],friendlyShipsLocations[4]])
    const [fbattleshipLocations] =useState([friendlyShipsLocations[5], friendlyShipsLocations[6], friendlyShipsLocations[7], friendlyShipsLocations[8]])
    const [fdestroyerLocations] =useState([friendlyShipsLocations[9], friendlyShipsLocations[10], friendlyShipsLocations[11]])
    const [fsubmarineLocations] =useState([friendlyShipsLocations[12], friendlyShipsLocations[13], friendlyShipsLocations[14]])
    const [fpatrolLocations] = useState([friendlyShipsLocations[15], friendlyShipsLocations[16]])

    const onFire = (n) => {
        let rnm = Math.floor(Math.random() * 100)

        while(computerShots.includes(rnm)){
            rnm = Math.floor(Math.random() * 100)
        }
        computerShots.push(rnm)
 
        setFireAi(rnm)
        if(shipsLocations.includes(n)){
            if(carrierHits.length !== 5 && carrierLocations.includes(n)){
                carrierHits.push("hit")
                if(carrierHits.length===5){
                    setDisplayAiShips({...displayAiShips, carrier: true}) 
                    alert("carrier sunk")
                }
            }else if(battleshipHits.length !== 4 && battleshipLocations.includes(n)){
                battleshipHits.push("hit")
                if(battleshipHits.length===4){
                    setDisplayAiShips({...displayAiShips, battleship: true})
                    alert("battleship sunk")
                }
            }else if(destroyerHits.length !== 3 && destroyerLocations.includes(n)){
                destroyerHits.push("hit")
                if(destroyerHits.length===3){
                    setDisplayAiShips({...displayAiShips, destroyer: true})
                    alert("destroyer sunk")
                }
            }else if(submarineHits.length !== 3 && submarineLocations.includes(n)){
                submarineHits.push("hit")
                if(submarineHits.length===3){
                    setDisplayAiShips({...displayAiShips, submarine: true})
                    alert("submarine sunk")
                }
            }else if(patrolHits.length !== 2 && patrolLocations.includes(n)){
                patrolHits.push("hit")                
                if(patrolHits.length===2){
                    setDisplayAiShips({...displayAiShips, patrol: true})
                    alert("patrol sunk")
                }
            }
            return "hit"
        }else return "miss"
    }

  

    const enemyFire = () => {
        if(friendlyShipsLocations.includes(fireAi)){
            if(fcarrierHits.length !== 5 && fcarrierLocations.includes(fireAi)){
                fcarrierHits.push("hit")
                if(fcarrierHits.length===5){
                    alert("fcarrier sunk")
                }
            }else if(fbattleshipHits.length !== 4 && fbattleshipLocations.includes(fireAi)){
                fbattleshipHits.push("hit")
                if(fbattleshipHits.length===4){
                    alert("fbattleship sunk")
                }
            }else if(fdestroyerHits.length !== 3 && fdestroyerLocations.includes(fireAi)){
                fdestroyerHits.push("hit")
                if(fdestroyerHits.length===3){
                    alert("fdestroyer sunk")
                }
            }else if(fsubmarineHits.length !== 3 && fsubmarineLocations.includes(fireAi)){
                fsubmarineHits.push("hit")
                if(fsubmarineHits.length===3){
                    alert("fsubmarine sunk")
                }
            }else if(fpatrolHits.length !== 2 && fpatrolLocations.includes(fireAi)){
                fpatrolHits.push("hit")                
                if(fpatrolHits.length===2){
                    alert("fpatrol sunk")
                }
            }
            return "hit"
        }else return "miss"


    }

    return (
        <div className="boards-battle-container">
            <Boardbattle type="friendly" shipsStartPosition={shipsStartPosition} enemyFire={enemyFire} fireAi={fireAi} />
            <Boardbattle type="enemy" display={displayAiShips} shipsStartPosition={aiStartPosition} locations={shipsLocations} onFire={onFire} />
        </div>
    )
}

export default Battlefield
