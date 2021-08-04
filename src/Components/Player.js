import React from 'react'
import "../CSS/Player.css"
import Body from './Body'
import Footer from './Footer'
import Sidebar from './Sidebar'


function Player({spotify}) {
    return (
        <div className="player">
            <div className="player_body">
                <Sidebar />
                <Body spotify={spotify}/>
            </div>
            <Footer />
        </div>
    )
}

export default Player
