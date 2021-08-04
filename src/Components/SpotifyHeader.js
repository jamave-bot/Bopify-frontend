import React from 'react'
import "../CSS/SpotifyHeader.css"
import SearchIcon from '@material-ui/icons/Search';
import {Avatar} from "@material-ui/core"
import { useDataLayerValue } from '../DataLayer';


function SpotifyHeader() {
  const [{spotifyUser}, dispatch] = useDataLayerValue();



    return (
        <div className="spotifyHeader">
            <div className="header_left">
                <SearchIcon />
                <input
                    placeholder="Search for Artists, Songs"
                    type="text"
                />
            </div>

            <div className="header_right">
                <Avatar src={spotifyUser?.images[0]?.url} alt={spotifyUser?.display_name}/>
                <h4>{spotifyUser?.display_name}</h4>
            </div>
        </div>
    )
}

export default SpotifyHeader
