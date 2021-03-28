import arrToItarate, {hoverStyles, isAllowed}from "./utils"

import Carrier from "../ships/carrier"
import Battleship from "../ships/battleship"
import Destroyer from "../ships/destroyer"
import Submarine from "../ships/submarine"
import Patrol from "../ships/patrol"
 
import {useState} from "react"

import "./board.scss"

const Board = () => {
    const [selectedShip, setSelectedShip] = useState("carrier")
    const [axis, setAxis] = useState("x")
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

    const changeAxis = () => {
        axis === "x" ? setAxis("y"): setAxis("x")
    }
    
    const handleCellClick = (n) => {
        if(selectedShip==="carrier"){
            if(isAllowed(n, 5, axis)){
                setSelectedShip("battleship")
            }
         }else if (selectedShip==="battleship"){
            if(isAllowed(n, 4, axis)){
                setSelectedShip("destroyer")
            }
        }else if (selectedShip==="destroyer"){
            if(isAllowed(n, 3, axis)){
                setSelectedShip("submarine")
            }
        }else if (selectedShip==="submarine"){
            if(isAllowed(n, 3, axis)){
                setSelectedShip("patrol")
            }
        }else if(selectedShip==="patrol"){
            if(isAllowed(n, 2, axis)){
                setSelectedShip("")
            }
        }
    }
    const handleCellHover = (n) => {
        setHoveredCell(n)
        if(selectedShip==="carrier"){
            if(isAllowed(n, 5, axis)){
                setCarrierAxis(axis)
                setCarrierStartPosition(n)
                setIsAllow(true)
            }else{
                setCarrierAxis("")
                setCarrierStartPosition(null)
                setIsAllow(false)
            }
         }else if (selectedShip==="battleship"){
            if(isAllowed(n, 4, axis)){
                setBattleshipAxis(axis)
                setBattleshipStartPosition(n) 
                setIsAllow(true)
            }else{
                setBattleshipAxis("")
                setBattleshipStartPosition(null) 
                setIsAllow(false)
            }
        }else if (selectedShip==="destroyer"){
            if(isAllowed(n, 3, axis)){
                setDestroyerAxis(axis)
                setDestroyerStartPosition(n) 
                setIsAllow(true)
            }else{
                setDestroyerAxis("")
                setDestroyerStartPosition(null) 
                setIsAllow(false)
            }
        }else if (selectedShip==="submarine"){
            if(isAllowed(n, 3, axis)){
                setSubmarineAxis(axis)
                setSubmarineStartPosition(n) 
                setIsAllow(true)
            }else{
                setSubmarineAxis("")
                setSubmarineStartPosition(null) 
                setIsAllow(false)
            }
        }else if(selectedShip==="patrol"){
            if(isAllowed(n, 2, axis)){
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
        <div onClick={changeAxis}>AXIS: {axis}</div>
        <div className="boards-container">
            <div className="board-container">
                <div className="board-grid">
                    <Carrier startPosition = {carrierStartPosition} axis={carrierAxis}/>
                    <Battleship startPosition = {battleshipStartPosition} axis={battleshipAxis}/>
                    <Destroyer startPosition = {destroyerStartPosition} axis={destroyerAxis}/>
                    <Submarine startPosition = {submarineStartPosition} axis={submarineAxis}/>
                    <Patrol startPosition = {patrolStartPosition} axis={patrolAxis}/>                    
                </div>
            </div>
            <div className="board-container">
                <div className="board-grid">
                    {
                        arrToItarate.map((item, i)=>(
                            <div 
                                className="cell" 
                                key={i}
                                onClick={()=>handleCellClick(i)}
                                onMouseEnter={()=>handleCellHover(i)}
                                onMouseLeave={()=>handleCellLeave(i)}
                                style={notAllowedStyles(hoveredCell, i)}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    </>)
}

export default Board