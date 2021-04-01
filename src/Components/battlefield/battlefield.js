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
let hitsOnTheGo = []

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

    const [firstHit, setFirstHit] = useState(null)
    const [lastHit, setLastHit] = useState(null)
 
    const [firstShot, setFirstShot] = useState(1)

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
        setFirstShot(firstShot + 1)
        console.log(firstHit)
        console.log(lastHit)

        /*if(firstShot===1){
            computerShots.push(87)
            setFireAi(87)
        }else if(firstShot===89){
            computerShots.push(30)
            setFireAi(30)
        }else{*/
        if(lastHit===null){
            if(firstHit!==null){
                let csh
                if(Number(firstHit.toString()[firstHit.toString().length - 1]) !== 9 && !computerShots.includes(firstHit + 1)){
                    csh = firstHit + 1;
                    computerShots.push(csh)
                    setLastHit(csh)
                    setFireAi(csh)
                }else if(Number(firstHit.toString().length) !== 1 && !computerShots.includes(firstHit - 10)){
                    csh = firstHit - 10;
                    computerShots.push(csh)
                    setLastHit(csh)
                    setFireAi(csh)
                }else if(firstHit + 10 <= 100 && !computerShots.includes(firstHit + 10)){
                    csh = firstHit + 10;
                    computerShots.push(csh)
                    setLastHit(csh)
                    setFireAi(csh)
                }
            }else{
                let rnm = Math.floor(Math.random() * 100)

                while(computerShots.includes(rnm)){
                    rnm = Math.floor(Math.random() * 100)
                }
                computerShots.push(rnm)
     
                setFireAi(rnm)
            }
        }else{
            let csh;
            if(lastHit + 10 === firstHit || lastHit + 20 === firstHit || lastHit + 30 === firstHit || lastHit - 10 === firstHit || lastHit - 20 === firstHit || lastHit - 30 === firstHit){
                console.log("verticall trying")
                if(Number(lastHit.toString().length) !== 1 && !computerShots.includes(lastHit - 10)){
                    csh = lastHit - 10;
                    computerShots.push(csh)
                    setFireAi(csh)
                }else{
                    console.log("no up ")
                    if((computerShots.includes(lastHit + 10) || lastHit + 10 >= 100) && (computerShots.includes(firstHit + 10) || firstHit + 10 >= 100)){
                        console.log("Aleatory sorry no othe option")
                        console.log("a")
                        
                        let rnm = Math.floor(Math.random() * 100)

                        while(computerShots.includes(rnm)){
                            rnm = Math.floor(Math.random() * 100)
                        }
                        computerShots.push(rnm)
             
                        setFireAi(rnm)
                    }else if(computerShots.includes(lastHit + 10) || lastHit + 10 >= 100 ){
                        console.log("b")
                        csh = firstHit + 10;
                        computerShots.push(csh)
                        setFireAi(csh)
                    }else{
                        console.log("c")
                        csh = lastHit + 10;
                        computerShots.push(csh)
                        setFireAi(csh)
                    }
                }
            }else if(lastHit + 1 === firstHit || lastHit + 2 === firstHit || lastHit + 3 === firstHit || lastHit - 1 === firstHit || lastHit - 2 === firstHit || lastHit - 3 === firstHit){
                if(Number(lastHit.toString()[lastHit.toString().length - 1]) !== 0 && !computerShots.includes(lastHit - 1)){
                    
                    csh = lastHit - 1;
                    computerShots.push(csh)
                    setFireAi(csh)

                }else{
                    if((computerShots.includes(lastHit + 1) || Number(lastHit.toString()[lastHit.toString().length - 1]) === 9) && (computerShots.includes(firstHit + 1) || Number(firstHit.toString()[firstHit.toString().length - 1]) === 9)){
                        console.log("Aleatory sorry no othe option")
                        let rnm = Math.floor(Math.random() * 100)

                        while(computerShots.includes(rnm)){
                            rnm = Math.floor(Math.random() * 100)
                        }
                        computerShots.push(rnm)
             
                        setFireAi(rnm)
                    }else if(computerShots.includes(lastHit + 1) || Number(lastHit.toString()[lastHit.toString().length - 1]) === 9){
                        csh = firstHit + 1;
                        computerShots.push(csh)
                        setFireAi(csh)
                    }else {
                        csh = lastHit + 1;
                        computerShots.push(csh)
                        setFireAi(csh)
                    }
                }
            }else{
                if(Number(lastHit.toString()[lastHit.toString().length - 1]) !== 0 && !computerShots.includes(lastHit - 1)){
                    csh = lastHit - 1;
                    computerShots.push(csh)
                    setFireAi(csh)
                }else if(Number(lastHit.toString()[lastHit.toString().length - 1]) !== 9 && !computerShots.includes(lastHit + 1)){
                    csh = lastHit + 1;
                    computerShots.push(csh)
                    setFireAi(csh)
                }else if(Number(lastHit.toString().length) !== 1 && !computerShots.includes(lastHit - 10)){
                    csh = lastHit - 10;
                    computerShots.push(csh)
                    setFireAi(csh)
                }else if(lastHit + 10 <= 100 && !computerShots.includes(lastHit + 10)){
                    csh = lastHit + 10;
                    computerShots.push(csh)
                    setFireAi(csh)
                }else{
                    let rnm = Math.floor(Math.random() * 100)

                    while(computerShots.includes(rnm)){
                        rnm = Math.floor(Math.random() * 100)
                    }
                    computerShots.push(rnm)
        
                    setFireAi(rnm)
                }
            }
        }
        //}
        if(shipsLocations.includes(n)){
            if(carrierHits.length !== 5 && carrierLocations.includes(n)){
                carrierHits.push("hit")
                if(carrierHits.length===5){
                    setDisplayAiShips({...displayAiShips, carrier: true}) 
                    seteCarrierSunk(true)
                }
            }else if(battleshipHits.length !== 4 && battleshipLocations.includes(n)){
                battleshipHits.push("hit")
                if(battleshipHits.length===4){
                    setDisplayAiShips({...displayAiShips, battleship: true})
                    seteBattleshipSunk(true)
                }
            }else if(destroyerHits.length !== 3 && destroyerLocations.includes(n)){
                destroyerHits.push("hit")
                if(destroyerHits.length===3){
                    setDisplayAiShips({...displayAiShips, destroyer: true})
                    seteDestroyerSunk(true)
                }
            }else if(submarineHits.length !== 3 && submarineLocations.includes(n)){
                submarineHits.push("hit")
                if(submarineHits.length===3){
                    setDisplayAiShips({...displayAiShips, submarine: true})
                    seteSubmarineSunk(true)
                }
            }else if(patrolHits.length !== 2 && patrolLocations.includes(n)){
                patrolHits.push("hit")                
                if(patrolHits.length===2){
                    setDisplayAiShips({...displayAiShips, patrol: true})
                    setePatrolSunk(true)
                }
            }
            return "hit"
        }else return "miss"
    }

  

    const enemyFire = () => {
        let lastShotSunkedShip = false
        if(friendlyShipsLocations.includes(fireAi)){
            hitsOnTheGo.push(fireAi)
            if(fcarrierHits.length !== 5 && fcarrierLocations.includes(fireAi)){
                fcarrierHits.push("hit")
                if(fcarrierHits.length===5){
                    hitsOnTheGo= hitsOnTheGo.filter(x => !fcarrierLocations.includes(x));
                    lastShotSunkedShip=true
                    if(hitsOnTheGo.length){
                        setFirstHit(hitsOnTheGo[0])
                        setLastHit(hitsOnTheGo[0])
                    }else{
                        setFirstHit(null)
                        setLastHit(null)
                    }
                    setCarrierSunk(true)
                }
            }else if(fbattleshipHits.length !== 4 && fbattleshipLocations.includes(fireAi)){
                fbattleshipHits.push("hit")
                if(fbattleshipHits.length===4){
                    hitsOnTheGo= hitsOnTheGo.filter(x => !fbattleshipLocations.includes(x));
                    lastShotSunkedShip=true
                    if(hitsOnTheGo.length){
                        setFirstHit(hitsOnTheGo[0])
                        setLastHit(hitsOnTheGo[0])
                    }else{
                        setFirstHit(null)
                        setLastHit(null)
                    }
                    setBattleshipSunk(true)
                }
            }else if(fdestroyerHits.length !== 3 && fdestroyerLocations.includes(fireAi)){
                fdestroyerHits.push("hit")
                if(fdestroyerHits.length===3){
                    hitsOnTheGo= hitsOnTheGo.filter(x => !fdestroyerLocations.includes(x));
                    lastShotSunkedShip=true
                    if(hitsOnTheGo.length){
                        setFirstHit(hitsOnTheGo[0])
                        setLastHit(hitsOnTheGo[0])
                    }else{
                        setFirstHit(null)
                        setLastHit(null)
                    }
                    setDestroyerSunk(true)
                }
            }else if(fsubmarineHits.length !== 3 && fsubmarineLocations.includes(fireAi)){
                fsubmarineHits.push("hit")
                if(fsubmarineHits.length===3){
                    hitsOnTheGo= hitsOnTheGo.filter(x => !fsubmarineLocations.includes(x));
                    lastShotSunkedShip=true
                    if(hitsOnTheGo.length){
                        setFirstHit(hitsOnTheGo[0])
                        setLastHit(hitsOnTheGo[0])
                    }else{
                        setFirstHit(null)
                        setLastHit(null)
                    }
                    setSubmarineSunk(true)
                }
            }else if(fpatrolHits.length !== 2 && fpatrolLocations.includes(fireAi)){
                fpatrolHits.push("hit")                
                if(fpatrolHits.length===2){
                    hitsOnTheGo = hitsOnTheGo.filter(x => !fpatrolLocations.includes(x));
                    lastShotSunkedShip=true
                    if(hitsOnTheGo.length){
                        setFirstHit(hitsOnTheGo[0])
                        setLastHit(hitsOnTheGo[0])
                    }else{
                        setFirstHit(null)
                        setLastHit(null)
                    }
                    setPatrolSunk(true)
                }
            }

            if(firstHit===null){
                setFirstHit(fireAi)
            }
            if(!lastShotSunkedShip){
                setLastHit(fireAi)
            }else {
                lastShotSunkedShip = false
            }

            return "hit"
        }else {
            setLastHit(null)
            return "miss"
        }
    }

    return (
        <div className="boards-battle-container">
            <Boardbattle type="friendly" carrierSunk={carrierSunk} battleshipSunk={battleshipSunk} destroyerSunk={destroyerSunk} submarineSunk={submarineSunk} patrolSunk={patrolSunk} shipsStartPosition={shipsStartPosition} enemyFire={enemyFire} fireAi={fireAi} />
            <Boardbattle type="enemy" carrierSunk={ecarrierSunk} battleshipSunk={ebattleshipSunk} destroyerSunk={edestroyerSunk} submarineSunk={esubmarineSunk} patrolSunk={epatrolSunk} display={displayAiShips} shipsStartPosition={aiStartPosition} locations={shipsLocations} onFire={onFire} />
        </div>
    )
}

export default Battlefield
