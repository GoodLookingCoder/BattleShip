import React from 'react'
import "./shot.scss"

const Shot = ({hit}) => {
    return (
        <div className="shot-cont">
            <svg
                width={16}
                height={16}
                fill={hit ? '#8a1a1a' : '#5f5d5dbf'}
                xmlns='http://www.w3.org/2000/svg'
            >
                <circle cx={8} cy={8} r={8} />
             </svg>
        </div>
    )
}

export default Shot
