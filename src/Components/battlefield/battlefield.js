import {useState, useEffect} from 'react'

import Boardbattle from "../boardbattle/boardbattle"
import Coments from "../coments/coments"

import {generateRandomLocs} from "./randomLocs"

import "./battlefield.scss"

const Battlefield = ({shipsStartPosition, setWinner, setStage, playSound, winner,name, playerHitsInRow, setPlayerHitsInRow, computerHitsInRow, setComputerHitsInRow, playerMissInRow, setPlayerMissInRow, computerMissInRow, setComputerMissInRow, setPlayerAcurrency, setComputerAcurrency, setStatsFirstHit}) => {
    const [shipsLocations] = useState(generateRandomLocs())
    
    const [carrierA] = useState(shipsLocations[0] === shipsLocations[1] - 1 ? "x" : "y" )
    const [batteshipA] = useState(shipsLocations[5] === shipsLocations[6] - 1 ? "x" : "y" )
    const [destroyerA] = useState(shipsLocations[9] === shipsLocations[10] - 1 ? "x" : "y" )
    const [submarineA] = useState(shipsLocations[12] === shipsLocations[13] - 1 ? "x" : "y" )
    const [patrolA] = useState(shipsLocations[15] === shipsLocations[16] - 1 ? "x" : "y" )

    const [carrierLocations] = useState([shipsLocations[0], shipsLocations[1], shipsLocations[2], shipsLocations[3], shipsLocations[4]])
    const [battleshipLocations] = useState([shipsLocations[5], shipsLocations[6], shipsLocations[7], shipsLocations[8]])
    const [destroyerLocations] = useState([shipsLocations[9], shipsLocations[10], shipsLocations[11]])
    const [submarineLocations] = useState([shipsLocations[12], shipsLocations[13], shipsLocations[14]])
    const [patrolLocations] = useState([shipsLocations[15], shipsLocations[16]])

    const [carrierHits, setCarrierHits] = useState([])
    const [battleshipHits, setBattleshipHits] = useState([])
    const [destroyerHits, setDestroyerHits] = useState([])
    const [submarineHits, setSubmarineHits] = useState([])
    const [patrolHits, setPatrolHits] = useState([])
    
    const [fcarrierHits, setFcarrierHits] = useState([])
    const [fbattleshipHits, setFbattleshipHits] = useState([])
    const [fdestroyerHits, setFdestroyerHits] = useState([])
    const [fsubmarineHits, setFsubmarineHits] = useState([])
    const [fpatrolHits, setFpatrolHits] = useState([])
    
    const [computerShots, setComputerShots]= useState([])
    const [hitsOnTheGo, setHitsOnTheGo] = useState([])
    const [lastShotSunked, setLastShotSunked] = useState([])

    const [aiStartPosition] = useState({
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
    const [invalidShot, setInvalidShot] = useState(false)

    const [fadeOutAnim, setFadeOutAnim] = useState(false)
    const [comments, setComments] = useState(`Awating orders, Capitan ${name}`)

    const [sunkedShipsList, setSunkedShipsList] = useState([])

    //stats
    const [mutablePHIR, setMutablePHIR] = useState(0)
    const [mutableCHIR, setMutableCHIR] = useState(0)
    const [mutablePMIR, setMutablePMIR] = useState(0)
    const [mutableCMIR, setMutableCMIR] = useState(0)
    useEffect(()=>{
        if(mutablePHIR > playerHitsInRow) {
            setPlayerHitsInRow(mutablePHIR)
        }
    }, [mutablePHIR])
    useEffect(()=>{
        if(mutableCHIR > computerHitsInRow) {
            setComputerHitsInRow(mutableCHIR)
        }
    }, [mutableCHIR])
    useEffect(()=>{
        if(mutablePMIR > playerMissInRow) {
            setPlayerMissInRow(mutablePMIR)
        }
    }, [mutablePMIR])
    useEffect(()=>{
        if(mutableCMIR > computerMissInRow) {
            setComputerMissInRow(mutableCMIR)
        }
    }, [mutableCMIR])

    const [playerNumOfShots, setPlayerNumOfShots] = useState(0)
    const [playerNumOfHits, setPlayerNumOfHits] = useState(0)

    const [computerNumOfShots, setComputerNumOfShots] = useState(0)
    const [computerNumOfHits, setComputerNumOfHits] = useState(0)


    useEffect(()=>{
        if(playerNumOfHits === 1 && computerNumOfHits === 0){
            setStatsFirstHit("player")
        }else if(playerNumOfHits === 0 && computerNumOfHits === 1){
            setStatsFirstHit("computer")
        }
    }, [playerNumOfHits, computerNumOfHits])

    useEffect(()=>{
        console.log(carrierSunk)
        if(carrierSunk && battleshipSunk && destroyerSunk && submarineSunk && patrolSunk){
            setComputerAcurrency( Math.floor(( computerNumOfHits / computerNumOfShots) * 100))
            setPlayerAcurrency(Math.floor(( playerNumOfHits / playerNumOfShots) * 100))
            setWinner("Computer")
            setTimeout(()=>setFadeOutAnim(true), 3000)
            setTimeout(()=>setStage("stats"), 4900) 
        }
    }, [carrierSunk,battleshipSunk,destroyerSunk,submarineSunk,patrolSunk])

    useEffect(()=>{
        if(ecarrierSunk && ebattleshipSunk && edestroyerSunk && esubmarineSunk && epatrolSunk){
            setPlayerAcurrency(Math.floor(( playerNumOfHits / playerNumOfShots) * 100))
            setComputerAcurrency( Math.floor(( computerNumOfHits / computerNumOfShots) * 100))
            setWinner("Player")
            setTimeout(()=>setFadeOutAnim(true), 3000)
            
            setTimeout(()=>setStage("stats"), 4900) 
        }
    }, [ecarrierSunk,ebattleshipSunk,edestroyerSunk,esubmarineSunk,epatrolSunk])

    const onFire = (n) => {
        let noYouCantShot;
        let vtr;
        if(!winner){
        setFirstShot(firstShot + 1)
        playSound("shot", 0.7)
        setPlayerNumOfShots(playerNumOfShots + 1)
        //player
    
        if(shipsLocations.includes(n)){
            
            setMutablePHIR(mutablePHIR + 1)
            setMutablePMIR(0)
            setPlayerNumOfHits(playerNumOfHits + 1)
            setComments("You fire a Shot into enemys waters.... and its a Hit!!")
            setTimeout(()=>{
                playSound("hit", 0.7)
            }, 1500)
            if(carrierHits.length !== 5 && carrierLocations.includes(n)){
                setCarrierHits([...carrierHits, "hit"])
                if(carrierHits.length===4){
                    setComments("You fire a Shot into enemys waters.... You sunk their Carrier!!")
                    setTimeout(()=>{
                        setDisplayAiShips({...displayAiShips, carrier: true}) 
                    }, 1600)
                    seteCarrierSunk(true)
                    setSunkedShipsList([...sunkedShipsList, "sunked"])
                    if(sunkedShipsList.length===4) noYouCantShot=true
                }
            }else if(battleshipHits.length !== 4 && battleshipLocations.includes(n)){
                setBattleshipHits([...battleshipHits, "hit"])
                if(battleshipHits.length===3){
                    setComments("You fire a Shot into enemys waters.... You sunk their Battleship!!")
                    setTimeout(()=>{
                        setDisplayAiShips({...displayAiShips, battleship: true})
                    }, 1600)
                    seteBattleshipSunk(true)
                    setSunkedShipsList([...sunkedShipsList, "sunked"])
                    if(sunkedShipsList.length===4) noYouCantShot=true
                }
            }else if(destroyerHits.length !== 3 && destroyerLocations.includes(n)){
                setDestroyerHits([...destroyerHits, "hit"])
                if(destroyerHits.length===2){
                    setComments("You fire a Shot into enemys waters.... You sunk their Destroyer!!")
                    setTimeout(()=>{
                        setDisplayAiShips({...displayAiShips, destroyer: true})
                    }, 1600)
                    seteDestroyerSunk(true)
                    setSunkedShipsList([...sunkedShipsList, "sunked"])
                    if(sunkedShipsList.length===4) noYouCantShot=true
                }
            }else if(submarineHits.length !== 3 && submarineLocations.includes(n)){
                setSubmarineHits([...submarineHits, "hit"])
                if(submarineHits.length===2){
                    setComments("You fire a Shot into enemys waters.... You sunk their Submarine!!")
                    setTimeout(()=>{
                        setDisplayAiShips({...displayAiShips, submarine: true})
                    }, 1600)
                    seteSubmarineSunk(true)
                    setSunkedShipsList([...sunkedShipsList, "sunked"])
                    if(sunkedShipsList.length===4) noYouCantShot=true
                }
            }else if(patrolHits.length !== 2 && patrolLocations.includes(n)){
                setPatrolHits([...patrolHits, "hit"])        
                if(patrolHits.length===1){
                    setComments("You fire a Shot into enemys waters.... You sunk their Patrol!!")
                    setTimeout(()=>{
                        setDisplayAiShips({...displayAiShips, patrol: true})
                    }, 1600)
                    setePatrolSunk(true)
                    setSunkedShipsList([...sunkedShipsList, "sunked"])
                    if(sunkedShipsList.length===4) noYouCantShot=true
                }
            }
            vtr = "hit"
        }else{
            setMutablePHIR(0)
            setMutablePMIR(mutablePMIR + 1)
            setComments("You fire a shot into enemys waters .... and misses")
            setTimeout(()=>{
                playSound("miss", 0.7)
            }, 1500)  
            vtr = "miss"
        } 
        }

        //computer ai
        if(!noYouCantShot && !winner){
            setTimeout(()=>{
                setComments("Your opponent is aiming....")
            }, 3000)

            setTimeout(()=>{
                if(lastHit===null){
                    if(firstHit!==null){
                        let csh
                        if(Number(firstHit.toString()[firstHit.toString().length - 1]) !== 9 && !computerShots.includes(firstHit + 1)){
                            csh = firstHit + 1;
                            setComputerShots([...computerShots, csh])
                            setLastHit(csh)
                            setFireAi(csh)
                        }else if(Number(firstHit.toString().length) !== 1 && !computerShots.includes(firstHit - 10)){
                            csh = firstHit - 10;
                            setComputerShots([...computerShots, csh])
                            setLastHit(csh)
                            setFireAi(csh)
                        }else if(firstHit + 10 <= 100 && !computerShots.includes(firstHit + 10)){
                            csh = firstHit + 10;
                            setComputerShots([...computerShots, csh])
                            setLastHit(csh)
                            setFireAi(csh)
                        }
                    }else{
                        let rnm = Math.floor(Math.random() * 100)
        
                        while(computerShots.includes(rnm)){
                            rnm = Math.floor(Math.random() * 100)
                        }
                        setComputerShots([...computerShots, rnm])
            
                        setFireAi(rnm)
                    }
                }else{
                    let csh;
                    if(lastHit + 10 === firstHit || lastHit + 20 === firstHit || lastHit + 30 === firstHit || lastHit - 10 === firstHit || lastHit - 20 === firstHit || lastHit - 30 === firstHit){
                        console.log("verticall trying")
                        if(Number(lastHit.toString().length) !== 1 && !computerShots.includes(lastHit - 10)){
                            csh = lastHit - 10;
                            setComputerShots([...computerShots, csh])
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
                                setComputerShots([...computerShots, requestAnimationFrame])
                    
                                setFireAi(rnm)
                            }else if(computerShots.includes(lastHit + 10) || lastHit + 10 >= 100 ){
                                console.log("b")
                                csh = firstHit + 10;
                                setComputerShots([...computerShots, csh])
                                setFireAi(csh)
                            }else{
                                console.log("c")
                                csh = lastHit + 10;
                                setComputerShots([...computerShots, csh])
                                setFireAi(csh)
                            }
                        }
                    }else if(lastHit + 1 === firstHit || lastHit + 2 === firstHit || lastHit + 3 === firstHit || lastHit - 1 === firstHit || lastHit - 2 === firstHit || lastHit - 3 === firstHit){
                        if(Number(lastHit.toString()[lastHit.toString().length - 1]) !== 0 && !computerShots.includes(lastHit - 1)){
                            
                            csh = lastHit - 1;
                            setComputerShots([...computerShots, csh])
                            setFireAi(csh)
        
                        }else{
                            if((computerShots.includes(lastHit + 1) || Number(lastHit.toString()[lastHit.toString().length - 1]) === 9) && (computerShots.includes(firstHit + 1) || Number(firstHit.toString()[firstHit.toString().length - 1]) === 9)){
                                console.log("Aleatory sorry no othe option")
                                let rnm = Math.floor(Math.random() * 100)
        
                                while(computerShots.includes(rnm)){
                                    rnm = Math.floor(Math.random() * 100)
                                }
                                setComputerShots([...computerShots, rnm])
                    
                                setFireAi(rnm)
                            }else if(computerShots.includes(lastHit + 1) || Number(lastHit.toString()[lastHit.toString().length - 1]) === 9){
                                csh = firstHit + 1;
                                setComputerShots([...computerShots, csh])
                                setFireAi(csh)
                            }else {
                                csh = lastHit + 1;
                                setComputerShots([...computerShots, csh])
                                setFireAi(csh)
                            }
                        }
                    }else{
                        if(Number(lastHit.toString()[lastHit.toString().length - 1]) !== 0 && !computerShots.includes(lastHit - 1)){
                            csh = lastHit - 1;
                            setComputerShots([...computerShots, csh])
                            setFireAi(csh)
                        }else if(Number(lastHit.toString()[lastHit.toString().length - 1]) !== 9 && !computerShots.includes(lastHit + 1)){
                            csh = lastHit + 1;
                            setComputerShots([...computerShots, csh])
                            setFireAi(csh)
                        }else if(Number(lastHit.toString().length) !== 1 && !computerShots.includes(lastHit - 10)){
                            csh = lastHit - 10;
                            setComputerShots([...computerShots, csh])
                            setFireAi(csh)
                        }else if(lastHit + 10 <= 100 && !computerShots.includes(lastHit + 10)){
                            csh = lastHit + 10;
                            setComputerShots([...computerShots, csh])
                            setFireAi(csh)
                        }else{
                            let rnm = Math.floor(Math.random() * 100)
        
                            while(computerShots.includes(rnm)){
                                rnm = Math.floor(Math.random() * 100)
                            }
                            setComputerShots([...computerShots, csh])
                
                            setFireAi(rnm)
                        }
                    }
                }
            }, 4500)
        }
        return vtr
   }//end

  
    useEffect(()=>{
        console.log(hitsOnTheGo)
        console.log(lastShotSunked)
        if( lastShotSunked){
            if(hitsOnTheGo.length){
                setFirstHit(hitsOnTheGo[0])
                setLastHit(hitsOnTheGo[0])
            }else{
                setFirstHit(null)
                setLastHit(null)
            }
        }
    }, [hitsOnTheGo])

    const enemyFire = () => {
        let lastShotSunkedShip = false
        setComputerNumOfShots(computerNumOfShots + 1)
        playSound("shot", 0.7)
        if(friendlyShipsLocations.includes(fireAi)){
            setMutableCHIR(mutableCHIR + 1)
            setMutableCMIR(0)
            setComputerNumOfHits(computerNumOfHits + 1)
            setComments("The enemy fire a shot into your waters.... and its a Hit!!")
            setTimeout(()=>{
                playSound("hit", 0.7)
            }, 1500)
            setHitsOnTheGo([...hitsOnTheGo, fireAi])
            if(fcarrierHits.length !== 5 && fcarrierLocations.includes(fireAi)){
                setFcarrierHits([...fcarrierHits, "hit"])
                if(fcarrierHits.length===4){
                    setComments("The enemy fire a shot into your waters.... they sunk your Carrier")
                    lastShotSunkedShip = true
                    setLastShotSunked(true)
                    setHitsOnTheGo(hitsOnTheGo.filter(x => !fcarrierLocations.includes(x)))

                    setTimeout(()=>{
                        setCarrierSunk(true)                        
                    }, 1600)
                }else{
                    setLastShotSunked(false)
                }
            }else if(fbattleshipHits.length !== 4 && fbattleshipLocations.includes(fireAi)){
                setFbattleshipHits([...fbattleshipHits, "hit"])
                if(fbattleshipHits.length===3){
                    setComments("The enemy fire a shot into your waters.... they sunk your Battleship")
                    lastShotSunkedShip = true
                    setLastShotSunked(true)
                    setHitsOnTheGo(hitsOnTheGo.filter(x => !fbattleshipLocations.includes(x)))
 
                    setTimeout(()=>{
                        setBattleshipSunk(true)                        
                    }, 1600)
                }else{
                    setLastShotSunked(false)
                }
            }else if(fdestroyerHits.length !== 3 && fdestroyerLocations.includes(fireAi)){
                setFdestroyerHits([...fdestroyerHits, "hit"])
                if(fdestroyerHits.length===2){
                    setComments("The enemy fire a shot into your waters.... they sunk your Destroyer")
                    lastShotSunkedShip = true
                    setLastShotSunked(true)
                    setHitsOnTheGo(hitsOnTheGo.filter(x => !fdestroyerLocations.includes(x)))
  
                    setTimeout(()=>{
                        setDestroyerSunk(true)                        
                    }, 1600)
                }else{
                    setLastShotSunked(false)
                }
            }else if(fsubmarineHits.length !== 3 && fsubmarineLocations.includes(fireAi)){
                setFsubmarineHits([...fsubmarineHits, "hit"])
                if(fsubmarineHits.length===2){
                    setComments("The enemy fire a shot into your waters.... they sunk your Submarine")
                    lastShotSunkedShip = true
                    setLastShotSunked(true)
                    setHitsOnTheGo(hitsOnTheGo.filter(x => !fsubmarineLocations.includes(x)))
   
                    setTimeout(()=>{
                        setSubmarineSunk(true)                       
                    }, 1600)
                }else{
                    setLastShotSunked(false)
                }
            }else if(fpatrolHits.length !== 2 && fpatrolLocations.includes(fireAi)){
                setFpatrolHits([...fpatrolHits, "hit"])           
                if(fpatrolHits.length===1){
                    setComments("The enemy fire a shot into your waters.... they sunk your Patrol")
                    lastShotSunkedShip = true
                    setLastShotSunked(true)
                    setHitsOnTheGo(hitsOnTheGo.filter(x => !fpatrolLocations.includes(x)))
     
                    setTimeout(()=>{
                        setPatrolSunk(true)                        
                    }, 1600)
                }else{
                    setLastShotSunked(false)
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
            setMutableCHIR(0)
            setMutableCMIR(mutableCMIR + 1)
            setLastHit(null)
            setLastShotSunked(false)
            setComments("The enemy fire a Shot into your waters .... and misses")
            setTimeout(()=>{
                playSound("miss", 0.7)
            }, 1500)  
            return "miss"
        }
    }

    return (
    <div 
        className="battle-cont"
        style={fadeOutAnim? {animation: " 2s ease 0s 1 normal none running fadeout"}: null}
    >
        <Coments comment={comments} />
        <div className="boards-battle-container">
            <div className="test">
                <h1 className="waters f">Friendly Waters</h1>
                <Boardbattle type="friendly" setInvalidShot={setInvalidShot} carrierSunk={carrierSunk} battleshipSunk={battleshipSunk} destroyerSunk={destroyerSunk} submarineSunk={submarineSunk} patrolSunk={patrolSunk} shipsStartPosition={shipsStartPosition} enemyFire={enemyFire} fireAi={fireAi} />
            </div>
            <div className="test">
                <h1 className="waters e">Enemy Waters</h1>
                <Boardbattle type="enemy" invalidShot={invalidShot} setInvalidShot={setInvalidShot} carrierSunk={ecarrierSunk} battleshipSunk={ebattleshipSunk} destroyerSunk={edestroyerSunk} submarineSunk={esubmarineSunk} patrolSunk={epatrolSunk} display={displayAiShips} shipsStartPosition={aiStartPosition} locations={shipsLocations} onFire={onFire} />
            </div>
        </div>
    </div>)
}

export default Battlefield
