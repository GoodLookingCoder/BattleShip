import {useState, useEffect} from "react"

import Board from "../board/board"
import Axis from "../axis/axis"
import ShipsContainer from "../display-ships/displayShips"

import {generateRandomLocs} from "../battlefield/randomLocs"

import "./placement.scss"

const Placement = ({setStage, name, shipsStartPosition, setShipsStartPositions, friendlyShipsLocations, setFriendlyShipsLocations}) => {
    const [axis, setAxis] = useState("x")
    const [selectedShip, setSelectedShip] = useState("")

    const[hasCarrierPLaced, setHasCarrierPlaced] = useState(false)
    const[hasBattleshipPLaced, setHasBattleshipPlaced] = useState(false)
    const[hasDestroyerPLaced, setHasDestroyerPlaced] = useState(false)
    const[hasSubmarinePLaced, setHasSubmarinePlaced] = useState(false)
    const[hasPatrolPLaced, setHasPatrolPlaced] = useState(false)

    const[randomLocs, setRandomLocs] = useState([])

    const [fadeOutAnim, setFadeOutAnim] = useState(false)

    useEffect(()=>{
        if(hasCarrierPLaced && hasBattleshipPLaced && hasDestroyerPLaced && hasSubmarinePLaced && hasPatrolPLaced){
            setFadeOutAnim(true)
            setTimeout(()=>setStage("battle"), 1900) 
         }
    }, [hasCarrierPLaced, hasBattleshipPLaced, hasDestroyerPLaced, hasSubmarinePLaced, hasPatrolPLaced])

    const generateRFLocs = () => {
        setRandomLocs(generateRandomLocs())
    }

    const changeAxis = () => {
        axis === "x" ? setAxis("y"): setAxis("x")
    }
    

    return (
        <div 
            className="placement-cont"
            style={fadeOutAnim? {animation: " 2s ease 0s 1 normal none running fadeout"}: null}      
        >
            <h2 className="header-subtitle">Place your ships captan {name}</h2>
            <div className="board-ships-container">
                <ShipsContainer 
                    hasCarrierPLaced={hasCarrierPLaced}
                    hasBattleshipPLaced={hasBattleshipPLaced} 
                    hasDestroyerPLaced={hasDestroyerPLaced}
                    hasSubmarinePLaced={hasSubmarinePLaced}
                    hasPatrolPLaced={hasPatrolPLaced}
                    selectedShip={selectedShip} 
                    setSelectedShip={setSelectedShip}
                    generateRFLocs={generateRFLocs}
                    axis={axis}
                    changeAxis={changeAxis}
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
                    shipLocations={friendlyShipsLocations}
                    setShipLocations={setFriendlyShipsLocations}
                    randomLocs={randomLocs}
                />
            </div>
        </div>
    )
}

export default Placement
