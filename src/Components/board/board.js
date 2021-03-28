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
                setCarrierAxis(axis)
                setCarrierStartPosition(n)
                setSelectedShip("battleship")
            }else{
                alert("Invalid Position")
            }
         }else if (selectedShip==="battleship"){
            if(isAllowed(n, 4)){
                setBattleshipAxis(axis)
                setBattleshipStartPosition(n) 
                setSelectedShip("destroyer")
            }else{
                alert("Invalid Position")
            }
        }else if (selectedShip==="destroyer"){
            if(isAllowed(n, 3)){
                setDestroyerAxis(axis)
                setDestroyerStartPosition(n) 
                setSelectedShip("submarine")
            }else{
                alert("invalid")
            }
        }else if (selectedShip==="submarine"){
            if(isAllowed(n, 3)){
                setSubmarineAxis(axis)
                setSubmarineStartPosition(n) 
                setSelectedShip("patrol")
            }else{
                alert("invalid")
            }
        }else if(selectedShip==="patrol"){
            if(isAllowed(n, 2)){
                setPatrolAxis(axis)
                setPatrolStartPosition(n) 
                setSelectedShip("")
            }else{
                alert("invalid")
            }
        }
    }

    const handleCellHover = (n) => {
        
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
                                onMouseEnter={()=>setHoveredCell(i)}
                                onMouseLeave={()=>setHoveredCell(null)}
                                style={hoverStyles(i, hoveredCell, selectedShip, axis)}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    </>)
}

export default Board