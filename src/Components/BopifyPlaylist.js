import React, {useState} from 'react'
import '../CSS/Body.css'
import SpotifyHeader from './SpotifyHeader'
// import SongRow from './SongRow';
import { useParams } from 'react-router'
import BopifyPlaylistIcon from '../bopifyPlaylistIcon.jpg';
import { useHistory } from 'react-router'





function BopifyPlaylist({spotify, user, addSong, deleteSong, deletePlaylist}) {
    const history = useHistory();
    const [formVisible, setFormVisible] = useState(false)
    const [songLink, setSongLink]= useState('')
    const {playlistId}= useParams()
    const playlist = user.playlists.find(pl => pl.id === parseInt(playlistId))
    const playlistSongs = user.songs.filter(song => song.playlist_id === parseInt(playlistId))
    console.log("Hello from BopifyPlaylist: ", user)
    console.log("This is the playlist: ", playlist)
    console.log("These are the songs: ", playlistSongs)

    const formToggle = ()=>{
        setFormVisible(!formVisible)
    }

    const handleSongLink = (e)=>{
        setSongLink(e.target.value)
    }

    const getSource = (link)=>{
        if (link.includes("spotify")){
            return "spotify"
        } else{
            return "youtube"
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        fetch("http://127.0.0.1:3000/songs", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "authorization": localStorage.token
            },
            body: JSON.stringify({
                song_link: songLink,
                source: getSource(songLink),
                playlist_id: playlistId
            })
        })
        .then(res => res.json())
        .then(newSong =>{
            console.log("This is the song you just made: ", newSong)
            if(newSong.errors){
                alert(newSong.errors.join(" "))
            }else{
                addSong(newSong)
            }

        })
    }

    const getSrc = (source, link)=>{

        if (source === 'spotify'){
            let newLink = link.slice((link.indexOf("track/")+6), (link.indexOf("track/")+28))
            return `https://open.spotify.com/embed/track/${newLink}`
        } else{
            let newLink = link.slice(-11)
            return `https://www.youtube.com/embed/${newLink}`
        }
    }


    const deleteThisSong = (song_id)=>{
        fetch(`http://127.0.0.1:3000/songs/${song_id}`, {
            method: "DELETE",
            headers: {
              "authorization": localStorage.token
            }
        })
        .then(res => res.json())
        .then(deletedSong =>{
            console.log("This is the Song you just destroyed: ", deletedSong)
            deleteSong(deletedSong)
        })
    }

    const deleteThisPlaylist = ()=>{
        fetch(`http://127.0.0.1:3000/playlists/${playlistId}`, {
            method: "DELETE",
            headers: {
              "authorization": localStorage.token
            }
        })
        .then(res => res.json())
        .then(deletedPlaylist =>{
            console.log("This is the playlist you just destroyed: ", deletedPlaylist)
            deletePlaylist(deletedPlaylist)
            history.push("/homepage")
        })
    }

    return (
        <div className="body">
            <SpotifyHeader spotify={spotify}/>

            <div className="body_info">
                <img src={BopifyPlaylistIcon} alt=""/>

                <div className="body_infoText">
                    <strong>Playlist</strong>
                    <h2>{playlist?.name}</h2>
                    <p onClick={formToggle}>Add Song Link?</p>
                    {formVisible ? 
                    <form onSubmit={handleSubmit}>
                        <input type='text' className="song_link" placeholder="Input Song Link" id="song_link" name="song_link" onChange={handleSongLink}/>
                        <button type="submit" className="submitButton">Submit link</button>
                    </form>
                    :  
                    null
                    }
                </div>

            </div>

            <div className="body_songs">
                {playlistSongs.map(song=>(
                    <div className="songsList">
                        <iframe 
                        className="songFrame"
                        // width="560" 
                        // height="315" 
                        src={getSrc(song.source, song.song_link)}
                        title="Music player" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                        </iframe>

                        <button onClick={()=>deleteThisSong(song.id)}>X</button>

                    </div>
                ))}
            </div>
            
            <div className="deletePlaylistButton">
                <button onClick={deleteThisPlaylist} >Delete Playlist?</button>
            </div>
            
        </div>
    )
}

export default BopifyPlaylist
