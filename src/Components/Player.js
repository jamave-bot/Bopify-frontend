import React from 'react'
import "../CSS/Player.css"
import Body from './Body'
import Footer from './Footer'
import Sidebar from './Sidebar'
// import { useHistory } from 'react-router'
import {Switch, Route} from 'react-router-dom';
import BopifyPlaylist from './BopifyPlaylist.js'
import SpotifyPlaylist from './SpotifyPlaylist'

function Player({spotify, user, addSong, deleteSong, deletePlaylist, addPlaylist }) {

    const renderPlaylist = (routerProps)=>{
        return <BopifyPlaylist 
        spotify={spotify} 
        user={user}
        addSong={addSong}
        deleteSong={deleteSong}
        deletePlaylist={deletePlaylist}
        />
    }

    const renderSpotifyPlaylist = (routerProps)=>{
        return <SpotifyPlaylist 
        spotify={spotify} 
        user={user}
        />
    }


    return (
        <div className="player">
            <div className="player_body">
                <Sidebar user={user} addPlaylist={addPlaylist}/>
                <Switch>
                    <Route path="/playlist/:playlistId" children={renderPlaylist}/>
                    <Route path="/spotifyPlaylist/:spotifyPlaylistId" children={renderSpotifyPlaylist}/>
                    <Route path="/homepage" children={<Body spotify={spotify}/>} />

                    {/* <Body spotify={spotify}/> */}

                </Switch>
            </div>
            <Footer />
        </div>
    )
}

export default Player
