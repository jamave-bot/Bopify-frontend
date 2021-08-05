import React, {useState} from 'react'
import '../CSS/Body.css'
import SpotifyHeader from './SpotifyHeader'
import { useDataLayerValue } from '../DataLayer.js';
import SongRow from './SongRow';
import { useParams } from 'react-router'


function SpotifyPlaylist({spotify}) {
    const [{searchTerm}] = useDataLayerValue();

    const {spotifyPlaylistId}= useParams()
    const [spotifyPlaylist, setSpotifyPlaylist] = useState({
        images: [{url:""}],
        tracks:{items: []}
    })
    // const [{spotifyPlaylists}] = useDataLayerValue();

    spotify.getPlaylist(spotifyPlaylistId).then((response)=>{
        // console.log("hEYOOOO 😍😍🤗🙂☺🤗😎this is the resposne",response)
        setSpotifyPlaylist(response)
        console.log("this is the filtered playlist: 🙂😎🤩🤩🤩😏🙄: ", filteredPlaylist )
    })

    const filteredPlaylist  =() =>{
        return spotifyPlaylist.tracks.items.filter(item=> item.track.name.includes(searchTerm))
    } 

    return (
        <div className="body">
            <SpotifyHeader spotify={spotify}/>

            <div className="body_info">
                <img src={spotifyPlaylist?.images[0].url} alt=""/>

                <div className="body_infoText">
                    <strong>Playlist</strong>
                    <h2>{spotifyPlaylist?.name}</h2>
                    <p>{spotifyPlaylist?.description}</p>
                </div>

            </div>

            <div className="body_songs">
                {/* <div className="body_icons">
                </div> */}

                {spotifyPlaylist?.tracks.items.map(item=>(
                    <SongRow track={item.track} />
                ))}
            </div>

        </div>
    )
}

export default SpotifyPlaylist
