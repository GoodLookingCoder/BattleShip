import {useState, useRef, useEffect, useCallback} from "react"

import './App.css'

import Header from "./Components/header/header"
import Placement from "./Components/placement/placement"
import Battlefield from "./Components/battlefield/battlefield"
import Start from "./Components/start/start"
import Stats from "./Components/stats/stats"
import Speaker from "./Components/speaker/speaker"

import music from "./Components/sounds/music.mp3"
import water from "./Components/sounds/water.mp3"
import shot from "./Components/sounds/shot.mp3"
import hit from "./Components/sounds/hit.mp3"
import miss from "./Components/sounds/miss.mp3"

function App() {
  const [stage, setStage] = useState("start")
  const [name, setName] = useState("")
  const [shipsStartPosition, setShipsStartPositions] = useState({
    carrier: {start: null, axis: ""},
    battleship: {start: null, axis: ""},
    destroyer: {start: null, axis: ""},
    submarine: {start: null, axis: ""},
    patrol: {start: null, axis: ""}
  })
  const [winner, setWinner] = useState("")
  const [playerHitsInRow, setPlayerHitsInRow] = useState(0)
  const [computerHitsInRow, setComputerHitsInRow] = useState(0)
  const [playerMissInRow, setPlayerMissInRow] = useState(0)
  const [computerMissInRow, setComputerMissInRow] = useState(0)
  const [playerAcurrency, setPlayerAcurrency] = useState(0)
  const [computerAcurrency, setComputerAcurrency] = useState(0)
  const [firstHit, setFirstHit] = useState("")

  const [volume, setVolume] = useState(true)

  const musicPlayer = useRef();
  const soundPlayer = useRef();
	const soundPlayer2 = useRef();

  const setVolumeProps = (value) => {
		value
			? (musicPlayer.current.volume = 0.5)
			: (musicPlayer.current.volume = 0);
		setVolume(value);
	};

  const playBgSound = useCallback(
    (sound, customVolume) => {

        const newVol = customVolume || 0.5;
        if (!musicPlayer.current.paused) musicPlayer.current.pause();
        musicPlayer.current.src =
          sound === 'music'
            ? music
            : sound === 'water'
            ? water
            : null;

        musicPlayer.current.load();
        musicPlayer.current.volume = newVol;
      if(volume){
        musicPlayer.current.play();
      }
		},
    [volume]
  );

  
  useEffect(()=>{
    if(stage==="start"){
      console.log("helo")
      if(musicPlayer.current.paused){
        playBgSound("music", 0.7)
      }
    }else if(stage==="battle"){
      fadeOutMusic()
      setTimeout(()=>{
        playBgSound("water", 0.7)
      }, 1000)
    }else if(stage === "stats"){
      fadeOutMusic()
      setTimeout(()=>{
        playBgSound("music", 0.7)
      }, 1000)
    }
  }, [stage])


  useEffect(()=>{
    if (musicPlayer.current.paused){
      musicPlayer.current.play();
    }
  }, [volume])

    const playSound = useCallback(
      (sound, customVolume) => {
        if(volume){
          const newVol = customVolume || 0.5;
          let player = soundPlayer;
          if (!soundPlayer.current.paused) {
            player = soundPlayer2;
          }
          player.current.src =
            sound === 'shot'
              ? shot
              : sound === 'miss'
              ? miss
              : sound === 'hit'
              ? hit
              : null;
          player.current.load();
          player.current.volume = newVol;
          player.current.play();
        }
      },[volume]
    ) 

    const fadeOutMusic = () => {
      const fadeOut = setInterval(() => {
        if (musicPlayer.current.volume <= 0.04) {
          musicPlayer.current.volume = 0;
          clearInterval(fadeOut);
        } else {
          musicPlayer.current.volume = musicPlayer.current.volume - 0.03;
        }
      }, 30);
    };

  return (
    <div className="App">
      <Header stage={stage}/>
      <Speaker volume={volume} setVolume={setVolumeProps} />
      {stage==="start"&&<Start name={name} setName={setName} setStage={setStage} />}
      {stage==="placement"&&<Placement name={name} shipsStartPosition={shipsStartPosition} setShipsStartPositions={setShipsStartPositions} setStage={setStage}/>}
      {stage==="battle"&&<Battlefield playerHitsInRow={playerHitsInRow} setPlayerHitsInRow={setPlayerHitsInRow} computerHitsInRow={computerHitsInRow} setComputerHitsInRow={setComputerHitsInRow} playerMissInRow={playerMissInRow} setPlayerMissInRow={setPlayerMissInRow} computerMissInRow={computerMissInRow} setComputerMissInRow={setComputerMissInRow} winner={winner} name={name} playSound={playSound} setStage={setStage} setWinner={setWinner} shipsStartPosition={shipsStartPosition} setPlayerAcurrency={setPlayerAcurrency}  setComputerAcurrency={setComputerAcurrency} firstHit={firstHit} setStatsFirstHit={setFirstHit}/>}
      {stage==="stats"&&
        <Stats 
          name={name}
          firstHit={firstHit} 
          setFirstHit={setFirstHit}
          computerAcurrancy={computerAcurrency} 
          setComputerAcurrency={setComputerAcurrency}
          playerAcurrancy={playerAcurrency} 
          setPlayerAcurrency={ setPlayerAcurrency}
          computerMissInRow={computerMissInRow} 
          setComputerMissInRow={setComputerMissInRow}
          playerMissInRow={playerMissInRow} 
          setPlayerMissInRow={setPlayerMissInRow}
          computerHitsInRow={computerHitsInRow} 
          setComputerHitsInRow={setComputerHitsInRow}
          playerHitsInRow={playerHitsInRow} 
          setPlayerHitsInRow={setPlayerHitsInRow}
          setStage={setStage} 
          winner={winner} 
          setWinner={setWinner} 
        />}
      <audio onEnded={() => musicPlayer.current.play()} ref={musicPlayer} />
      <audio ref={soundPlayer} />
      <audio ref={soundPlayer2} />
    </div>
  )
}

export default App