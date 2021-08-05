import React from 'react'
import '../CSS/Body.css'
import SpotifyHeader from './SpotifyHeader'
import { useDataLayerValue } from '../DataLayer.js';
import SongRow from './SongRow';


function Body({spotify}) {
  const [{discover_weekly}] = useDataLayerValue();

    return (
        <div className="body">
            <SpotifyHeader spotify={spotify}/>

            <div className="body_info">
                <img src={discover_weekly?.images[0].url} alt=""/>

                <div className="body_infoText">
                    <strong>Playlist</strong>
                    <h2>Discover Weekly</h2>
                    <p>{discover_weekly?.description}</p>
                </div>

            </div>

            <div className="body_songs">
                {/* <div className="body_icons">
                </div> */}

                {discover_weekly?.tracks.items.map(item=>(
                    <SongRow track={item.track} />
                ))}
            </div>

        </div>
    )
}

export default Body
