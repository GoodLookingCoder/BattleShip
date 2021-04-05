import React from 'react'

const Stats = ({winner, setWinner,setStage}) => {
    return (
        <div>
            {winner}
            <button onClick={()=>{setStage("start"); setWinner("")}}>Play Again</button>
        </div>
    )
}

export default Stats
