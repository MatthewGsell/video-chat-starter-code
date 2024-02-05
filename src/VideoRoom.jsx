import AgoraRTC from "agora-rtc-sdk-ng"
import { useEffect, useState } from "react"
import VideoPlayer from "./VideoPlayer"

const APP_ID = '811bba26fbdb400aa3e2eb62a5626e05'
const TOKEN = '007eJxTYAg6dPXN5JbauBqZkn/nHi29rJzt7cl08KY6S0vQ6eYNKjsVGCwMDZOSEo3M0pJSkkwMDBITjVONUpPMjBJNzYzMUg1M+zgOpjYEMjLMamRjZWSAQBCflaEsMyU1n4EBAM+uIHw='
const CHANNEL = "video"
const client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'})

function VideoRoom () {
    const [users, setUsers] = useState([])
    async function handleUserJoined(user, mediaType) {console.log('yo')
        await client.subscribe(user, mediaType)
        if (mediaType == 'video') {
            setUsers([...users, user])
        }
        if(mediaType == 'audio') {
            user.audioTrack.play()
        }
    }
    function handleuserleft(user) {
        const newusers = users.filter((u) => {
            if (u.uid != user.uid) {
                return user
            }
        })
        setUsers(newusers)
    }

    useEffect(() => {
        client.on('user-published', handleUserJoined)
        client.on('user-left', handleuserleft)
        client.join(APP_ID, CHANNEL, TOKEN, null).then((uid) => {
            return Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
        }).then(([tracks, uid]) => {
            const [audioTrack, videoTrack] = tracks
            setUsers([...users, {
                uid: uid,
                videoTrack: videoTrack
            }])
            client.publish(tracks)
        } )
    }, [users])

    console.log(users)



    return <div id="videoroom">Video Room{users.map((user) => {
        return <VideoPlayer key={user.uid} user={user}  />
    })}</div>
}



export default VideoRoom