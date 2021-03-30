import {useState, useEffect} from "react"

import Board from "../board/board"
import Axis from "../axis/axis"
import ShipsContainer from "../display-ships/displayShips"

import "./placement.scss"

const Placement = ({setStage, shipsStartPosition, setShipsStartPositions}) => {
    const [axis, setAxis] = useState("x")
    const [selectedShip, setSelectedShip] = useState("")

    const[hasCarrierPLaced, setHasCarrierPlaced] = useState(false)
    const[hasBattleshipPLaced, setHasBattleshipPlaced] = useState(false)
    const[hasDestroyerPLaced, setHasDestroyerPlaced] = useState(false)
    const[hasSubmarinePLaced, setHasSubmarinePlaced] = useState(false)
    const[hasPatrolPLaced, setHasPatrolPlaced] = useState(false)

    useEffect(()=>{
        if(hasCarrierPLaced && hasBattleshipPLaced && hasDestroyerPLaced && hasSubmarinePLaced && hasPatrolPLaced){
            setStage("battle") 
         }
    }, [hasCarrierPLaced, hasBattleshipPLaced, hasDestroyerPLaced, hasSubmarinePLaced, hasPatrolPLaced])

    const changeAxis = () => {
        axis === "x" ? setAxis("y"): setAxis("x")
    }
    

    return (
        <div>
            <h2 className="header-subtitle">Place your ships captan Edel</h2>
            <Axis axis={axis} changeAxis={changeAxis}/>
            <div className="board-ships-container">
                <ShipsContainer 
                    hasCarrierPLaced={hasCarrierPLaced}
                    hasBattleshipPLaced={hasBattleshipPLaced} 
                    hasDestroyerPLaced={hasDestroyerPLaced}
                    hasSubmarinePLaced={hasSubmarinePLaced}
                    hasPatrolPLaced={hasPatrolPLaced}
                    selectedShip={selectedShip} 
                    setSelectedShip={setSelectedShip}
                />
                <Board 
                    hasCarrierPLaced={hasCarrierPLaced}
                    hasBattleshipPLaced={hasBattleshipPLaced} 
                    hasDestroyerPLaced={hasDestroyerPLaced}
                    hasSubmarinePLaced={hasSubmarinePLaced}
                    hasPatrolPLaced={hasPatrolPLaced}
                    setHasCarrierPlaced={setHasCarrierPlaced} 
                    setHasBattleshipPlaced={setHasBattleshipPlaced}
                    setHasDestroyerPlaced={setHasDestroyerPlaced}
                    setHasSubmarinePlaced={setHasSubmarinePlaced}
                    setHasPatrolPlaced={setHasPatrolPlaced}
                    selectedShip={selectedShip} 
                    setSelectedShip={setSelectedShip} 
                    axis={axis}
                    shipsStartPosition={shipsStartPosition}
                    setShipsStartPositions={setShipsStartPositions}
                />
            </div>
        </div>
    )
}

export default Placement
