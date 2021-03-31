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

const Battlefield = ({shipsStartPosition, setWinner, setStage}) => {
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

    const getFriendlyLocations = () => {
        const loc = []
        if(shipsStartPosition.carrier.axis==="x"){
            loc.push(shipsStartPosition.carrier.start,shipsStartPosition.carrier.start + 1, shipsStartPosition.carrier.start +2 , shipsStartPosition.carrier.start +3 , shipsStartPosition.carrier.start + 4)
        }else{
            loc.push(shipsStartPosition.carrier.start , shipsStartPosition.carrier.start + 10 , shipsStartPosition.carrier.start +20 , shipsStartPosition.carrier.start +30 , shipsStartPosition.carrier.start + 40)
        }
        if(shipsStartPosition.battleship.axis==="x"){
            loc.push(shipsStartPosition.battleship.start , shipsStartPosition.battleship.start + 1 , shipsStartPosition.battleship.start +2 , shipsStartPosition.battleship.start +3)
        }else{
            loc.push(shipsStartPosition.battleship.start , shipsStartPosition.battleship.start + 10 , shipsStartPosition.battleship.start +20 , shipsStartPosition.battleship.start +30)
        }
        if(shipsStartPosition.destroyer.axis==="x"){
            loc.push(shipsStartPosition.destroyer.start , shipsStartPosition.destroyer.start + 1 , shipsStartPosition.destroyer.start +2)
        }else{
            loc.push(shipsStartPosition.destroyer.start , shipsStartPosition.destroyer.start + 10 , shipsStartPosition.destroyer.start +20)
        }
        if(shipsStartPosition.submarine.axis==="x"){
            loc.push(shipsStartPosition.submarine.start , shipsStartPosition.submarine.start + 1 , shipsStartPosition.submarine.start +2)
        }else{
            loc.push(shipsStartPosition.submarine.start , shipsStartPosition.submarine.start + 10 , shipsStartPosition.submarine.start +20)
        }
        if(shipsStartPosition.patrol.axis==="x"){
            loc.push(shipsStartPosition.patrol.start , shipsStartPosition.patrol.start + 1 )
        }else{
            loc.push(shipsStartPosition.patrol.start , shipsStartPosition.patrol.start + 10)
        }
        return loc
    }
    console.log(getFriendlyLocations())
    const [friendlyShipsLocations] = useState(getFriendlyLocations())

    const [fireAi, setFireAi] = useState(null)

    const [fcarrierLocations] =useState([friendlyShipsLocations[0], friendlyShipsLocations[1], friendlyShipsLocations[2], friendlyShipsLocations[3],friendlyShipsLocations[4]])
    const [fbattleshipLocations] =useState([friendlyShipsLocations[5], friendlyShipsLocations[6], friendlyShipsLocations[7], friendlyShipsLocations[8]])
    const [fdestroyerLocations] =useState([friendlyShipsLocations[9], friendlyShipsLocations[10], friendlyShipsLocations[11]])
    const [fsubmarineLocations] =useState([friendlyShipsLocations[12], friendlyShipsLocations[13], friendlyShipsLocations[14]])
    const [fpatrolLocations] = useState([friendlyShipsLocations[15], friendlyShipsLocations[16]])

    const[carrierSunk, setCarrierSunk] = useState(false)
    const[battleshipSunk, setBattleshipSunk] = useState(false)
    const[destroyerSunk, setDestroyerSunk] = useState(false)
    const[submarineSunk, setSubmarineSunk] = useState(false)
    const[patrolSunk, setPatrolSunk] = useState(false)

    const[ecarrierSunk, seteCarrierSunk] = useState(false)
    const[ebattleshipSunk, seteBattleshipSunk] = useState(false)
    const[edestroyerSunk, seteDestroyerSunk] = useState(false)
    const[esubmarineSunk, seteSubmarineSunk] = useState(false)
    const[epatrolSunk, setePatrolSunk] = useState(false)

    useEffect(()=>{
        if(carrierSunk && battleshipSunk && destroyerSunk && submarineSunk && patrolSunk){
            setWinner("Computer")
            setStage("stats")
        }
    }, [carrierSunk,battleshipSunk,destroyerSunk,submarineSunk,patrolSunk])

    useEffect(()=>{
        if(ecarrierSunk && ebattleshipSunk && edestroyerSunk && esubmarineSunk && epatrolSunk){
            setWinner("Player")
            setStage("stats")
        }
    }, [ecarrierSunk,ebattleshipSunk,edestroyerSunk,esubmarineSunk,epatrolSunk])

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
                    seteCarrierSunk(true)
                    alert("carrier sunk")
                }
            }else if(battleshipHits.length !== 4 && battleshipLocations.includes(n)){
                battleshipHits.push("hit")
                if(battleshipHits.length===4){
                    setDisplayAiShips({...displayAiShips, battleship: true})
                    seteBattleshipSunk(true)
                    alert("battleship sunk")
                }
            }else if(destroyerHits.length !== 3 && destroyerLocations.includes(n)){
                destroyerHits.push("hit")
                if(destroyerHits.length===3){
                    setDisplayAiShips({...displayAiShips, destroyer: true})
                    seteDestroyerSunk(true)
                    alert("destroyer sunk")
                }
            }else if(submarineHits.length !== 3 && submarineLocations.includes(n)){
                submarineHits.push("hit")
                if(submarineHits.length===3){
                    setDisplayAiShips({...displayAiShips, submarine: true})
                    seteSubmarineSunk(true)
                    alert("submarine sunk")
                }
            }else if(patrolHits.length !== 2 && patrolLocations.includes(n)){
                patrolHits.push("hit")                
                if(patrolHits.length===2){
                    setDisplayAiShips({...displayAiShips, patrol: true})
                    setePatrolSunk(true)
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
                    setCarrierSunk(true)
                }
            }else if(fbattleshipHits.length !== 4 && fbattleshipLocations.includes(fireAi)){
                fbattleshipHits.push("hit")
                if(fbattleshipHits.length===4){
                    alert("fbattleship sunk")
                    setBattleshipSunk(true)
                }
            }else if(fdestroyerHits.length !== 3 && fdestroyerLocations.includes(fireAi)){
                fdestroyerHits.push("hit")
                if(fdestroyerHits.length===3){
                    alert("fdestroyer sunk")
                    setDestroyerSunk(true)
                }
            }else if(fsubmarineHits.length !== 3 && fsubmarineLocations.includes(fireAi)){
                fsubmarineHits.push("hit")
                if(fsubmarineHits.length===3){
                    alert("fsubmarine sunk")
                    setSubmarineSunk(true)
                }
            }else if(fpatrolHits.length !== 2 && fpatrolLocations.includes(fireAi)){
                fpatrolHits.push("hit")                
                if(fpatrolHits.length===2){
                    alert("fpatrol sunk")
                    setPatrolSunk(true)
                }
            }
            return "hit"
        }else return "miss"


    }

    return (
        <div className="boards-battle-container">
            <Boardbattle type="friendly" carrierSunk={carrierSunk} battleshipSunk={battleshipSunk} destroyerSunk={destroyerSunk} submarineSunk={submarineSunk} patrolSunk={patrolSunk} shipsStartPosition={shipsStartPosition} enemyFire={enemyFire} fireAi={fireAi} />
            <Boardbattle type="enemy" carrierSunk={ecarrierSunk} battleshipSunk={ebattleshipSunk} destroyerSunk={edestroyerSunk} submarineSunk={esubmarineSunk} patrolSunk={epatrolSunk} display={displayAiShips} shipsStartPosition={aiStartPosition} locations={shipsLocations} onFire={onFire} />
        </div>
    )
}

export default Battlefield
