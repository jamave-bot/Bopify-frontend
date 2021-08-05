import React, {useState} from 'react'
import "../CSS/Sidebar.css"
import SidebarOption from './SidebarOption'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import ContactlessIcon from '@material-ui/icons/Contactless';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import { useDataLayerValue } from '../DataLayer';
import { useHistory } from 'react-router-dom';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';



function Sidebar({user, addPlaylist}) {
    const history = useHistory();
    const [{spotifyToken, spotifyPlaylists, bopifyPlaylists}] = useDataLayerValue();
    const [showForm, setShowForm]= useState(false)
    const [name, setName] = useState('')

    const handleChange = (e)=>{
        console.log(e.target.value)
        setName(e.target.value)
    }

    const toggleNewPlaylistForm = ()=>{
        setShowForm(!showForm)
    }

    const goToPlaylist = (id) =>{
        history.push(`/playlist/${id}`)
    }

    const goToSpotifyPlaylist = (id) =>{
        history.push(`/spotifyPlaylist/${id}`)
    }

    const goToHomePage = () =>{
        history.push('/homepage')
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        fetch("http://127.0.0.1:3000/playlists", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              "authorization": localStorage.token
            },
            body: JSON.stringify({
              name: name,
              user_id: user.id
            })
        })
        .then(res => res.json())
        .then(newPlaylist =>{
            console.log("This is the playlist you just made: ", newPlaylist)
            if(newPlaylist.errors){
                alert(newPlaylist.errors.join(", "))
            }else{
                addPlaylist(newPlaylist)
                e.target.value = ""
                toggleNewPlaylistForm()
                // history.push(`/homepage`)
            }
        })
    }

    return (
        <div className="sidebar">
            {/* <img className="sidebar_logo" src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="logo"/> */}
            <div onClick={goToHomePage}>
                <SidebarOption Icon={HomeIcon} title="Home" />
            </div>
            <SidebarOption Icon={SearchIcon} title="Search" />
            {/* <SidebarOption Icon={LibraryMusicIcon} title="Your Library" /> */}
            {spotifyToken ? 
            <SidebarOption Icon={ContactlessIcon} title="Logged In to Spotify"/>
            :
            <SidebarOption Icon={ContactlessIcon} title="Login to Spotify"/>
            }
            <br></br>
            <strong className="sidebarTitle">Bopify Playlists</strong>
            <hr></hr>
            <div onClick={toggleNewPlaylistForm}>
                {showForm ? <SidebarOption  Icon={IndeterminateCheckBoxIcon} title="Nevermind" /> : <SidebarOption  Icon={LibraryAddIcon} title="Add Bopify Playlist" />}
                {/* <SidebarOption  Icon={LibraryAddIcon} title="Add Bopify Playlist" /> */}
            </div>
            {showForm ? 
            
            <form className="newPlaylistForm" noValidate onSubmit={handleSubmit}>
                <input
                    placeholder="Name of Playlist"
                    id="name"
                    label="Playlist Name" 
                    name="name"
                    autoComplete="name"
                    onChange={handleChange}
                />
                
                <button type="submit">
                    Create
                </button>

            </form>
            :
                null
            }
            {bopifyPlaylists.map(playlist =>(
                <div  onClick={()=>goToPlaylist(playlist.id)}>
                    <SidebarOption title={playlist.name}/>
                </div>
            ))}
            <br></br>
            <strong className="sidebarTitle">Spotify Playlists</strong>
            <hr></hr>

            {spotifyPlaylists?.items?.map(playlist =>(
                <div onClick={()=>goToSpotifyPlaylist(playlist.id)}>
                    <SidebarOption title={playlist.name}/>
                </div>
            ))}

        </div>
    )
}

export default Sidebar
