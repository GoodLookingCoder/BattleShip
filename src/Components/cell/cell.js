import React from 'react'

import "./cell.scss"

import {useState, useEffect} from "react"

const Cell = ({fireAi, type, enemyFire, onFire, placement, handleCellClick, handleCellHover, handleCellLeave, notAllowedStyles, index, hoveredCell}) => {
    const [hasBennClicked, setHasBeenClicked] = useState(false)
    const [hitOrMiss, setHitOrMiss] = useState("") 

    const handleFire = () => {
        setHitOrMiss(onFire(index))
        setHasBeenClicked(true)
    }
    
    useEffect(()=>{
        if(type==="friendly"){
            if(fireAi!==null && index===fireAi){

            setHitOrMiss(enemyFire()) 
            }
        }
     }, [fireAi])
    

    return (
        <div 
            className="cell" 
            onClick={placement?()=>handleCellClick(index): type==="enemy"? !hasBennClicked ? handleFire: null : null}
            onMouseEnter={placement?()=>handleCellHover(index):null}
            onMouseLeave={placement?()=>handleCellLeave(index):null}
            style={placement?notAllowedStyles(hoveredCell, index):null}
        >
    
            {hitOrMiss==="hit"&&"HIT"}
            {hitOrMiss==="miss"&&"MISS"}
 
        </div>
    )
}

export default Cell
