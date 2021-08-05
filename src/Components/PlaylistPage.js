// import React, {useState} from 'react'
// import { useParams } from 'react-router'
// import { useHistory } from 'react-router'
// import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function PlaylistPage(props) {
    // const [formVisible, setFormVisible] = useState(false)
    // const [songLink, setSongLink]= useState('')
    // const history = useHistory()

    // const {playlistId}= useParams()
    // const playlist = props.user.playlists.find(pl => pl.id === parseInt(playlistId))

    // <iframe width="560" height="315" src="https://www.youtube.com/embed/lbyyVIIkdeQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    // const playlistSongs = props.user.songs.filter(song => song.playlist_id === parseInt(playlistId))
// 
    //useEffect 
    //render out playlist


    // const showForm = (e) =>{
    //     setFormVisible(!formVisible)
    // }

    // const handleSubmit = (e)=>{
    //     e.preventDefault();
    //     fetch("http://127.0.0.1:3000/songs", {
    //         method: "POST",
    //         headers: {
    //           "Content-type": "application/json",
    //           "authorization": localStorage.token
    //         },
    //         body: JSON.stringify({
    //             song_link: songLink,
    //             source: getSource(songLink),
    //             playlist_id: playlistId
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(newSong =>{
    //         console.log("This is the song you just made: ", newSong)
    //         if(newSong.errors){
    //             alert(newSong.errors.join(" "))
    //         }else{
    //             props.addSong(newSong)
    //         }

    //     })
    // }

    // const handleSongLink = (e)=>{
    //     setSongLink(e.target.value)
    // }

    // const getSource = (link)=>{
    //     if (link.includes("spotify")){
    //         return "spotify"
    //     } else{
    //         return "youtube"
    //     }
    // }

    // const deleteSong = (song_id)=>{
    //     fetch(`http://127.0.0.1:3000/songs/${song_id}`, {
    //         method: "DELETE",
    //         headers: {
    //           "authorization": localStorage.token
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(deletedSong =>{
    //         console.log("This is the Song you just destroyed: ", deletedSong)
    //         props.deleteSong(deletedSong)
    //     })
    // }

    // const musicList = () =>{
    //     console.log("we are hittin this")
    //     console.log(props.user.songs)
    //     return playlistSongs.map(song=>{
    //         return <>
    //         <iframe 
    //             width="560" 
    //             height="315" 
    //             src={getSrc(song.source, song.song_link)}
    //             title="Music player" frameborder="0" 
    //             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    //             allowfullscreen>
    //         </iframe>
    //         <br></br>
    //         <button onClick={()=>deleteSong(song.id)}>X</button>
    //         <br></br>
    //         <br></br>

    //         </>
    //     })
    // }

    // const getSrc = (source, link)=>{

    //     if (source === 'spotify'){
    //         let newLink = link.slice((link.indexOf("track/")+6), (link.indexOf("track/")+28))
    //         return `https://open.spotify.com/embed/track/${newLink}`
    //     } else{
    //         let newLink = link.slice(-11)
    //         return `https://www.youtube.com/embed/${newLink}`
    //     }
    // }

    // const deletePlaylist = ()=>{
    //     fetch(`http://127.0.0.1:3000/playlists/${playlistId}`, {
    //         method: "DELETE",
    //         headers: {
    //           "authorization": localStorage.token
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(deletedPlaylist =>{
    //         console.log("This is the playlist you just destroyed: ", deletedPlaylist)
    //         props.deletePlaylist(deletedPlaylist)
    //         history.push("/homepage")
    //     })
    // }

    return (
        <>
            {/* <h2>{playlist? playlist.name: "nothin"}</h2>  
            <button onClick={showForm}>{formVisible ? "Nevermind" :"Add Song"}</button>
            <button onClick={deletePlaylist}>Delete Playlist?</button>

            {formVisible ? 
            <form onSubmit={handleSubmit}>
                <label for='song_link'>Song Link</label>
                <input type='text' id="song_link" name="song_link" onChange={handleSongLink}/>
                <button type="submit">Submit link</button>
            </form>
            :  
            null
            }

            <br></br>
            <br></br>
            <br></br>

            {musicList()}

            <br></br>
            <br></br>
            <br></br> */}
            {/* <button onClick={deletePlaylist}>Delete Playlist?</button> */}
      
        
        </>
    )
}
