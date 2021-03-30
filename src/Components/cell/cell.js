import React from 'react'

import "./cell.scss"

const Cell = ({placement, handleCellClick, handleCellHover, handleCellLeave, notAllowedStyles, index, hoveredCell}) => {
    return (
        <div 
            className="cell" 
            onClick={placement?()=>handleCellClick(index):null}
            onMouseEnter={placement?()=>handleCellHover(index):null}
            onMouseLeave={placement?()=>handleCellLeave(index):null}
            style={placement?notAllowedStyles(hoveredCell, index):null}
        />
    )
}

export default Cell
