import {useState} from 'react'

import "./start.scss"

const Start = ({name, setName, setStage}) => {
    const [unalawed, setUnalawed] = useState(false)
    const [fadeOutAnim, setFadeOutAnim] = useState(false)

    const startGameHandler = () => {
        if(name){
            setFadeOutAnim(true)
            setTimeout(()=>setStage("placement"), 1300)
        }else{
            setUnalawed(true)
            setTimeout(()=>setUnalawed(false), 3000)
        }
    }

    return (
        <div 
            className="player-info" 
            style={fadeOutAnim? {animation: "1.5s ease 0s 1 normal none running fadeout"}: null}    
        >
            <label>Enter Player Name:</label >
            <input 
                style={unalawed?{border: "1px solid #ff00003d"} : null}
                type="text" 
                placeholder="Battleship Combatant" 
                value={name}
                onChange={(e)=>setName(e.target.value)}    
            />
            <button onClick={startGameHandler}>Start Game </button >
        </div>
    )
}

export default Start
