import React from 'react'
import '../CSS/Body.css'
import SpotifyHeader from './SpotifyHeader'

function Body({spotify}) {
    return (
        <div className="body">
            <SpotifyHeader spotify={spotify}/>
        </div>
    )
}

export default Body
