import React from 'react'

import "./check.scss"
const Check = ({aditionalData}) => {
    return (
        <div className="logo-cont-check">
            <svg xmlns="http://www.w3.org/2000/svg"
                width="24" 
                height="24" 
                viewBox="0 0 24 24"
                fill="#73a572"
            >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
            </svg>
            {aditionalData!==undefined && <span> - ({aditionalData})</span>}
        </div>
    )
}

export default Check
