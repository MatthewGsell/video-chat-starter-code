import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import config from "../package.json";
import AgoraRTC from 'agora-rtc-sdk-ng';
import VideoRoom from './VideoRoom';









function App() {




const APP_ID = '811bba26fbdb400aa3e2eb62a5626e05'
const TOKEN = '007eJxTYAg6dPXN5JbauBqZkn/nHi29rJzt7cl08KY6S0vQ6eYNKjsVGCwMDZOSEo3M0pJSkkwMDBITjVONUpPMjBJNzYzMUg1M+zgOpjYEMjLMamRjZWSAQBCflaEsMyU1n4EBAM+uIHw='
const CHANNEL = "video"


const [joined, setJoined] = useState(false)


  return (
    <div id='maincontainer'>
      {!joined && (<button id="join-btn" onClick={() => {
        setJoined(true)
      }}>Join</button>)}
      {joined && (
        <VideoRoom />
      )}
      
      
    </div>
  )
}

export default App
