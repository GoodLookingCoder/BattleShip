import arrToItarate, {isAllowed}from "./utils"

import Carrier from "../ships/carrier"
import Battleship from "../ships/battleship"
import Destroyer from "../ships/destroyer"
import Submarine from "../ships/submarine"
import Patrol from "../ships/patrol"

import Cell from "../cell/cell"
 
import {useState} from "react"

import "../board.scss"

const Board = ({
    axis, 
    selectedShip, 
    setSelectedShip, 
    hasCarrierPLaced,
    setHasCarrierPlaced, 
    setHasBattleshipPlaced,
    setHasDestroyerPlaced,
    setHasSubmarinePlaced,
    setHasPatrolPlaced,
    hasBattleshipPLaced,
    hasDestroyerPLaced,
    hasSubmarinePLaced,
    hasPatrolPLaced,
    setShipsStartPositions,
    shipsStartPosition,
    shipLocations,
    setShipLocations
}) => {
    const [hoveredCell, setHoveredCell] = useState(null)
    const [isAllow, setIsAllow] = useState(true)
 
    const [carrierStartPosition, setCarrierStartPosition] = useState(null)
    const [carrierAxis, setCarrierAxis] = useState("")
    const [battleshipStartPosition, setBattleshipStartPosition] = useState(null)
    const [battleshipAxis, setBattleshipAxis] = useState("")
    const [destroyerStartPosition, setDestroyerStartPosition] = useState(null)
    const [destroyerAxis, setDestroyerAxis] = useState("")
    const [submarineStartPosition, setSubmarineStartPosition] = useState(null)
    const [submarineAxis, setSubmarineAxis] = useState("")
    const [patrolStartPosition, setPatrolStartPosition] = useState(null)
    const [patrolAxis, setPatrolAxis] = useState("")

    const handleCellClick = (n) => {
        if(selectedShip==="carrier"){
            if(isAllowed(n, 5, axis, shipLocations)){
                if(axis==="x"){
                    console.log(shipLocations)
                    setShipLocations([...shipLocations, n, n+1, n+2, n+3, n+4])
                    setShipsStartPositions({...shipsStartPosition, carrier: {start: n, axis: "x"}})
                }
                else{
                    setShipLocations([...shipLocations, n, n+10, n+20, n+30, n+40])
                    setShipsStartPositions({...shipsStartPosition, carrier: {start: n, axis: "y"}})
                }
                setHasCarrierPlaced(true)
                setSelectedShip("")
            }
         }else if (selectedShip==="battleship"){
            if(isAllowed(n, 4, axis, shipLocations)){
                if(axis==="x"){
                    setShipLocations([...shipLocations, n, n+1, n+2, n+3])
                    setShipsStartPositions({...shipsStartPosition, battleship: {start: n, axis: "x"}})
                }
                else {
                    setShipLocations([...shipLocations, n, n+10, n+20, n+30])
                    setShipsStartPositions({...shipsStartPosition, battleship: {start: n, axis: "y"}})
                }
                setHasBattleshipPlaced(true)
                setSelectedShip("")
            }
        }else if (selectedShip==="destroyer"){
            if(isAllowed(n, 3, axis, shipLocations)){
                if(axis==="x"){
                    setShipLocations([...shipLocations, n, n+1, n+2])
                    setShipsStartPositions({...shipsStartPosition, destroyer: {start: n, axis: "x"}})
                }
                else{
                    setShipLocations([...shipLocations, n, n+10, n+20])
                    setShipsStartPositions({...shipsStartPosition, destroyer: {start: n, axis: "y"}})
                }
                setHasDestroyerPlaced(true)
                setSelectedShip("")
            }
        }else if (selectedShip==="submarine"){
            if(isAllowed(n, 3, axis, shipLocations)){
                if(axis==="x"){
                    setShipLocations([...shipLocations, n, n+1, n+2])
                    setShipsStartPositions({...shipsStartPosition, submarine: {start: n, axis: "x"}})
                }
                else{
                    setShipLocations([...shipLocations, n, n+10, n+20])
                    setShipsStartPositions({...shipsStartPosition, submarine: {start: n, axis: "y"}})
                }
                setHasSubmarinePlaced(true)
                setSelectedShip("")
            }
        }else if(selectedShip==="patrol"){
            if(isAllowed(n, 2, axis, shipLocations)){
                if(axis==="x"){
                    setShipLocations([...shipLocations, n, n+1])
                    setShipsStartPositions({...shipsStartPosition, patrol: {start: n, axis: "x"}})
                }
                else {
                    setShipLocations([...shipLocations, n, n+10])
                    setShipsStartPositions({...shipsStartPosition, patrol: {start: n, axis: "y"}})
                }
                setHasPatrolPlaced(true)
                setSelectedShip("")
            }
        }
    }
    const handleCellHover = (n) => {
        setHoveredCell(n)
        if(selectedShip==="carrier"){
            if(isAllowed(n, 5, axis, shipLocations)){
                setCarrierAxis(axis)
                setCarrierStartPosition(n)
                setIsAllow(true)
            }else{
                setCarrierAxis("")
                setCarrierStartPosition(null)
                setIsAllow(false)
            }
         }else if (selectedShip==="battleship"){
            if(isAllowed(n, 4, axis, shipLocations)){
                setBattleshipAxis(axis)
                setBattleshipStartPosition(n) 
                setIsAllow(true)
            }else{
                setBattleshipAxis("")
                setBattleshipStartPosition(null) 
                setIsAllow(false)
            }
        }else if (selectedShip==="destroyer"){
            if(isAllowed(n, 3, axis, shipLocations)){
                setDestroyerAxis(axis)
                setDestroyerStartPosition(n) 
                setIsAllow(true)
            }else{
                setDestroyerAxis("")
                setDestroyerStartPosition(null) 
                setIsAllow(false)
            }
        }else if (selectedShip==="submarine"){
            if(isAllowed(n, 3, axis, shipLocations)){
                setSubmarineAxis(axis)
                setSubmarineStartPosition(n) 
                setIsAllow(true)
            }else{
                setSubmarineAxis("")
                setSubmarineStartPosition(null) 
                setIsAllow(false)
            }
        }else if(selectedShip==="patrol"){
            if(isAllowed(n, 2, axis, shipLocations)){
                setPatrolAxis(axis)
                setPatrolStartPosition(n) 
                setIsAllow(true)
            }else{
                setPatrolAxis("")
                setPatrolStartPosition(null) 
                setIsAllow(false)
            }
        }
    }
    const handleCellLeave = (n) => {
        setHoveredCell(null)
        if(selectedShip==="carrier"){
            setCarrierStartPosition(null)
        }else if (selectedShip==="battleship"){
            setBattleshipStartPosition(null) 
        }else if (selectedShip==="destroyer"){
            setDestroyerStartPosition(null) 
        }else if (selectedShip==="submarine"){
            setSubmarineStartPosition(null) 
        }else if(selectedShip==="patrol"){
            setPatrolStartPosition(null) 
        }
    }

    const notAllowedStyles = (hoveredCell, i) => {
        if(!isAllow && hoveredCell === i) return {backgroundColor: "#80000078"}
    } 

    return (<>
        <div className="boards-container">
            <div className="board-container">
                <div className="board-grid">
                    <Carrier display={true} hasCarrierPlaced={hasCarrierPLaced} startPosition = {carrierStartPosition} axis={carrierAxis}/>
                    <Battleship display={true} hasBattleshipPLaced={hasBattleshipPLaced} startPosition = {battleshipStartPosition} axis={battleshipAxis}/>
                    <Destroyer display={true} hasDestroyerPLaced={hasDestroyerPLaced} startPosition = {destroyerStartPosition} axis={destroyerAxis}/>
                    <Submarine display={true} hasSubmarinePLaced={hasSubmarinePLaced} startPosition = {submarineStartPosition} axis={submarineAxis}/>
                    <Patrol display={true} hasPatrolPLaced={hasPatrolPLaced} startPosition = {patrolStartPosition} axis={patrolAxis}/>                    
                </div>
            </div>
            <div className="board-container">
                <div className="board-grid">
                    {
                        arrToItarate.map((item, i)=>(
                            <Cell 
                                key={i}
                                handleCellClick={handleCellClick}
                                handleCellHover={handleCellHover}
                                handleCellLeave={handleCellLeave}
                                notAllowedStyles={notAllowedStyles}
                                index={i}
                                hoveredCell={hoveredCell}
                                placement={true}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    </>)
}

export default Board