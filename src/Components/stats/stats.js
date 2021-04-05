import React,{useState} from 'react'
import "./stats.scss"

import Check from "../check/check" 
import X from "../x/x";

const Stats = ({name, winner, playerAcurrancy, computerAcurrancy, playerHitsInRow,computerHitsInRow,playerMissInRow,computerMissInRow,firstHit , setWinner,setStage}) => {
    const [fadeOutAnim, setFadeOutAnim] = useState(false)

    const handleReset = () => {
        setFadeOutAnim(true)
        setTimeout(()=>{
            setWinner("")
            setStage("placement")
        }, 1300)


    }
    return (
        <div className="stats-cont" style={fadeOutAnim? {animation: "1.5s ease 0s 1 normal none running fadeout"}: null}>
            <h2 className="header-sub">Statistics</h2>
            <div className="flex-stat-cont">
                <div className="flex-stat-i">
                </div>

                <div className="flex-stat-i">
                    <p>{name}</p>
                </div>
    
                <div className="flex-stat-i">
                    <p>Computer</p>
                </div>
            </div>
            <div className="flex-stat-cont">
                <div className="flex-stat-i">
                    <p>Winner:  </p>
                </div>

                <div className="flex-stat-i">
                    {winner==="Player" ? <Check /> : <X />}
                </div>

                <div className="flex-stat-i">
                    {winner==="Computer" ? <Check /> : <X />}
                </div>
            </div>
            <div className="flex-stat-cont">
                <div className="flex-stat-i">
                    <p>Acurrency:</p>
                </div>

                <div className="flex-stat-i">
                    {playerAcurrancy > computerAcurrancy ? <Check aditionalData={`${playerAcurrancy}%`} /> : <X  aditionalData={`${playerAcurrancy}%`}/>}
                </div>

                <div className="flex-stat-i">
                    {playerAcurrancy < computerAcurrancy ? <Check aditionalData={`${computerAcurrancy}%`} /> : <X aditionalData={`${computerAcurrancy}%`}/>}
                </div>
            </div>
            <div className="flex-stat-cont">
                <div className="flex-stat-i">
                    <p>Hits in Row:</p>
                </div>

                <div className="flex-stat-i">
                    {playerHitsInRow > computerHitsInRow ? <Check aditionalData={playerHitsInRow} /> : <X  aditionalData={playerHitsInRow}/>}
                </div>

                <div className="flex-stat-i">
                    {playerHitsInRow < computerHitsInRow ? <Check aditionalData={computerHitsInRow} /> : <X  aditionalData={computerHitsInRow}/>}
                </div>
            </div>
            <div className="flex-stat-cont">
                <div className="flex-stat-i">
                    <p>Miss in Row:</p>
                </div>

                <div className="flex-stat-i">
                    {playerMissInRow > computerMissInRow ? <Check aditionalData={playerMissInRow} /> : <X  aditionalData={playerMissInRow}/>}
                </div>

                <div className="flex-stat-i">
                    {playerMissInRow < computerMissInRow ? <Check aditionalData={computerMissInRow} /> : <X  aditionalData={computerMissInRow}/>}
                </div>
            </div>
            <div className="flex-stat-cont">
                <div className="flex-stat-i">
                    <p>First Hit:</p>
                </div>

                <div className="flex-stat-i">
                    {firstHit==="player" ? <Check /> : <X />}
                </div>

                <div className="flex-stat-i">
                {firstHit==="computer" ? <Check /> : <X />}
                </div>
            </div>
            <button onClick={handleReset}>Play Again</button>
        </div>
    )
}

export default Stats
