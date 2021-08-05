import React from 'react'
import "../CSS/Player.css"
import Body from './Body'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { useHistory } from 'react-router'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import BopifyPlaylist from './BopifyPlaylist.js'


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


    return (
        <div className="player">
            <div className="player_body">
                <Sidebar user={user} addPlaylist={addPlaylist}/>
                <Switch>
                    <Route path="/playlist/:playlistId" children={renderPlaylist}/>
                    <Body spotify={spotify}/>

                </Switch>
            </div>
            <Footer />
        </div>
    )
}

export default Player
