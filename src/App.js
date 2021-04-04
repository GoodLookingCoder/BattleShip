import {useState, useRef, useEffect, useCallback} from "react"

import './App.css'

import Header from "./Components/header/header"
import Placement from "./Components/placement/placement"
import Battlefield from "./Components/battlefield/battlefield"
import Stats from "./Components/stats/stats"
import Speaker from "./Components/speaker/speaker"

import music from "./Components/sounds/music.mp3"
import water from "./Components/sounds/water.mp3"
import shot from "./Components/sounds/shot.mp3"
import hit from "./Components/sounds/hit.mp3"
import miss from "./Components/sounds/miss.mp3"

function App() {
  const [stage, setStage] = useState("placement")
  const [shipsStartPosition, setShipsStartPositions] = useState({
    carrier: {start: null, axis: ""},
    battleship: {start: null, axis: ""},
    destroyer: {start: null, axis: ""},
    submarine: {start: null, axis: ""},
    patrol: {start: null, axis: ""}
  })
  const [winner, setWinner] = useState("")

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
      if(volume){
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
        musicPlayer.current.play();
      }
		},
    [volume]
  );

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

    useEffect(()=>{
      if(stage==="placement"){
        playBgSound("music", 0.7)
      }else if(stage==="battle"){
        fadeOutMusic()
        setTimeout(()=>{
          playBgSound("water", 0.7)
        }, 1000)
      }

    }, [stage])

  return (
    <div className="App">
      <Header />
      <Speaker volume={volume} setVolume={setVolumeProps}/>
      {stage==="placement"&&<Placement  shipsStartPosition={shipsStartPosition} setShipsStartPositions={setShipsStartPositions} setStage={setStage}/>}
      {stage==="battle"&&<Battlefield  playSound={playSound} setStage={setStage} setWinner={setWinner} shipsStartPosition={shipsStartPosition}/>}
      {stage==="stats"&&<Stats setStage={setStage} winner={winner}/>}
      <audio onEnded={() => musicPlayer.current.play()} ref={musicPlayer} />
      <audio ref={soundPlayer} />
      <audio ref={soundPlayer2} />
    </div>
  );
}

export default App