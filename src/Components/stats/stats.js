import React from 'react'

const Stats = ({winner, setStage}) => {
    return (
        <div>
            {winner}
            <button onClick={()=>setStage("placement")}>Play Again</button>
        </div>
    )
}

export default Stats
