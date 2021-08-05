import React from 'react'
import "../CSS/Sidebar.css"
import SidebarOption from './SidebarOption'
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import ContactlessIcon from '@material-ui/icons/Contactless';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import { useDataLayerValue } from '../DataLayer';
import { useHistory } from 'react-router-dom';




function Sidebar() {
    const history = useHistory();
    const [{spotifyToken, spotifyPlaylists, bopifyPlaylists}] = useDataLayerValue();

    const goToNewPlaylist = () =>{
        console.log("hello")
        history.push('/newPlaylist')
    }

    const goToPlaylist = (id) =>{
        history.push(`/playlist/${id}`)
    }

    const testC=()=>{
        console.log("yo")
    }

    return (
        <div className="sidebar">
            {/* <img className="sidebar_logo" src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="logo"/> */}
            <SidebarOption Icon={HomeIcon} title="Home" />
            <SidebarOption Icon={SearchIcon} title="Search" />
            <SidebarOption Icon={LibraryMusicIcon} title="Your Library" />
            {spotifyToken ? 
            <SidebarOption Icon={ContactlessIcon} title="Logged In to Spotify"/>
            :
            <SidebarOption Icon={ContactlessIcon} title="Login to Spotify"/>
            }
            <br></br>
            <strong className="sidebarTitle">Bopify Playlists</strong>
            <hr></hr>
            <div onClick={testC}>
                <SidebarOption  Icon={LibraryAddIcon} title="Add Bopify Playlist" />
            </div>
            {bopifyPlaylists.map(playlist =>(
                <SidebarOption title={playlist.name} onClick={goToPlaylist}/>
            ))}
            <br></br>
            <strong className="sidebarTitle">Spotify Playlists</strong>
            <hr></hr>

            {spotifyPlaylists?.items?.map(playlist =>(
                <SidebarOption title={playlist.name}/>
            ))}

        </div>
    )
}

export default Sidebar
