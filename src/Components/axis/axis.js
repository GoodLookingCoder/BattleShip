import React from 'react'
import "./axis.scss"

const Axis = ({axis, changeAxis}) => {
    return (
        <button className="axis" onClick={changeAxis}>AXIS: {axis.toUpperCase()}</button>
    )
}

export default Axis
