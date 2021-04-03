import React from 'react'

import "./cell.scss"
import Shot from "../shot/shot"


import {useState, useEffect} from "react"

const Cell = ({fireAi, type, enemyFire, onFire, placement, handleCellClick, handleCellHover, handleCellLeave, notAllowedStyles, index, hoveredCell}) => {
    const [hasBennClicked, setHasBeenClicked] = useState(false)
    const [hitOrMiss, setHitOrMiss] = useState("") 

    const [isHovered, setIsHovered] = useState(false)

    const handleFire = () => {
        setHitOrMiss(onFire(index))
        setHasBeenClicked(true)
    }

    const handleCellHover2 = () => {
        if(!hasBennClicked){
            setIsHovered(true)
            console.log("ededed")
        }
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
            onMouseEnter={placement?()=>handleCellHover(index):handleCellHover2 }
            onMouseLeave={placement?()=>handleCellLeave(index):()=>setIsHovered(false)}
            style={placement?notAllowedStyles(hoveredCell, index): type==="enemy"&&isHovered ? {backgroundColor: "#92282159", cursor: "crosshair"}: null}
        >
    
            {hitOrMiss==="hit"&&<Shot hit={true}/>}
            {hitOrMiss==="miss"&&<Shot hit={false}/>}
 
        </div>
    )
}

export default Cell
