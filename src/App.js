import './App.css';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import HomePage from './Components/HomePage';
import SignUpPage from './Components/SignUpPage';
// import '@fontsource/roboto';
import LoginPage from './Components/LoginPage'
import Header from './Components/Header'
// import NewPlaylistForm from './Components/NewPlayistForm';
import PlaylistPage from './Components/PlaylistPage'
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './DataLayer';
import Player from './Components/Player';
import CssBaseline from '@material-ui/core/CssBaseline';


const spotify = new SpotifyWebApi();

function App() {
  const [{spotifyUser, spotifyToken, spotifyPlaylists}, dispatch] = useDataLayerValue();

  const history = useHistory()
  const [id, setId] = useState(0)
  const [username, setUsername] = useState('')
  const [playlists, setPlaylists] = useState([])
  const [songs, setSongs] = useState([])
  const [token, setToken] = useState(null)

  const user={
    id: id,
    username: username,
    playlists: playlists,
    songs: songs, 
    token: token,
    spotifyToken: spotifyToken,
    spotifyUser: spotifyUser
  }


  useEffect(()=>{
    // console.log("This is what we derived from the URL: ", getTokenFromUrl())
    //this is for the spotify token
    const _spotifyToken = getTokenFromUrl().access_token;
    //we don't want it in the URI
    window.location.hash = "";
    
    // console.log("THIS IS OUR SPOTIFY TOKEN ✌ ", _spotifyToken)
    
    if (_spotifyToken){
      // setSpotifyToken(_spotifyToken)
      dispatch({
        type: "SET_TOKEN",
        spotifyToken: _spotifyToken
      })
      
      spotify.setAccessToken(_spotifyToken)
      
      spotify.getMe().then((user)=>{
        // setSpotifyUser(user)
        dispatch({
          type: 'SET_USER',
          spotifyUser: user 
        })
        console.log("this is in the getMe, ", user)
      });

      spotify.getUserPlaylists().then((playlists)=>{
        dispatch({
          type: "SET_PLAYLISTS",
          spotifyPlaylists: playlists
        })
      })

      spotify.getPlaylist("37i9dQZEVXcCAebSjCB2mY").then((response)=>{
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response
        })
      })

    }
            
    console.log("yo it worked", localStorage.token)
            
    if(localStorage.token){
        
      fetch("http://127.0.0.1:3000/me", {
          headers: {
            "authorization": localStorage.token
          }
        })
          .then(res => res.json())
          .then(handleResponse)  
      }

    },[])
          
    console.log("DIS YOU: ", spotifyUser)
    console.log("😎😎😎😋😋", spotifyPlaylists)
    console.log("Spotify Token: ", spotifyToken)


    const handleResponse = (resp) =>{
      console.log("this is coming from handleResponse: ", resp)
      if(resp.token){
        setId(resp.user.id)
        setUsername(resp.user.username)
        setPlaylists(resp.user.playlists)
        setSongs(resp.user.songs)
        setToken(resp.token)
        localStorage.token = resp.token
        history.push("/homepage")
        dispatch({
          type: "SET_BOPIFY_ID",
          bopifyUserId: resp.user.id
        })
        dispatch({
          type: "SET_BOPIFY_PLAYLISTS",
          bopifyPlaylists: resp.user.playlists
        })
    } else {
      alert(resp.errors)
    }
  }




  const renderHomePage = () =>{
    if (token){
      return <>
        <HomePage user={user}/>
        {/* <iframe title="musicPlayer" src="https://open.spotify.com/embed/track/4PuccpuGVKgdiULunPMS95" width="560" height="315" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe> */}
      </>
    } else{
      return <Redirect to="/login"/>
    }
  }

  // const renderYoutube = () =>{
  //   return <>
  //     <iframe width="560" height="315" src="https://www.youtube.com/embed/lbyyVIIkdeQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      
  //   </>
  // }

  const renderSignUpPage = () =>{
    return <>
      <SignUpPage handleRegisterSubmit={handleRegisterSubmit}/>
    </>
  }

  const handleRegisterSubmit = (userInfo) => {
    console.log("Register form has been submitted")

    fetch("http://127.0.0.1:3000/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    })
      .then(res => res.json())
      .then(handleResponse)

  }

  const renderLoginPage = () =>{
    return <>
      <LoginPage handleLoginSubmit={handleLoginSubmit}/>
    </>
  }

  const handleLoginSubmit = (userInfo) => {
    console.log("Login form has been submitted")

    fetch("http://127.0.0.1:3000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      })
    })
    .then(res => res.json())
    .then(handleResponse)
  }

  const logOut = () =>{
    console.log("boutta head out")
    dispatch({
      type: "LOGOUT"
    })
    setId(0)
    setUsername("")
    setPlaylists([])
    setSongs([])
    setToken(null)
    localStorage.clear()
    history.push("/login")
  }


  // const renderNewPlaylistPage = ()=>{
  //   return <>
  //     <NewPlaylistForm addPlaylist={addPlaylist} user={user}/>
  //   </>
  // }

  const addPlaylist = (newPlaylist)=>{
    setPlaylists([...playlists, newPlaylist])
    dispatch({
      type: "SET_BOPIFY_PLAYLISTS",
      bopifyPlaylists: [...playlists, newPlaylist]
    })
  }

  const renderPlaylistPage = (routerProps)=>{
    if(user.token){
      return <PlaylistPage
        user = {user}
        addSong={addSong}
        deleteSong={deleteSong}
        deletePlaylist={deletePlaylist}
      />
    } else {
      return <Redirect to="/login" /> //Instead of redirect could make a PUBLIC playlist comp, when it gets mounted, useEffect that makes the request to the backend to get /:playlistID
    }
  }

  const addSong=(newSong)=>{
    setSongs([...songs, newSong])
  }

  const deleteSong=(songToDelete)=>{
    let songsCopy = [...songs]
    let newSongs = songsCopy.filter(song=> song.id !== songToDelete.id)
    setSongs(newSongs)
  }

  const deletePlaylist=(playlistToDelete)=>{
    let playlistsCopy = [...playlists]
    let newPlaylists = playlistsCopy.filter(playlist=> playlist.id !== playlistToDelete.id)
    setPlaylists(newPlaylists)
    dispatch({
      type: "SET_BOPIFY_PLAYLISTS",
      bopifyPlaylists: newPlaylists 
    })
  }

  return (
    <div className="thePage">
        <CssBaseline />

        <Header user={user} handleLogOut={logOut}/>
        <Switch >
          {/* <Route path="/youtube" render={renderYoutube}/> */}
          {/* <Route path="/newPlaylist" render={renderNewPlaylistPage}/> */}
          <Route path="/playlist/:playlistId" children={renderPlaylistPage}/>
          <Route path="/homepage" render={renderHomePage}/>
          <Route path="/login" render={renderLoginPage}/>
          <Route path="/signup" render={renderSignUpPage} />
          <Route path="/spotifyPlaylist/:playlistId" children={renderPlaylistPage}/>
          <Route path="/" render={renderLoginPage}/>

          {/* <iframe title="musicPlayer" src="https://open.spotify.com/embed/track/4PuccpuGVKgdiULunPMS95" width="560" height="315" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/lbyyVIIkdeQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
        </Switch>
        {user.token ? 
        <Player 
        spotify={spotify} 
        user={user}  
        addSong={addSong}
        deleteSong={deleteSong}
        deletePlaylist={deletePlaylist}
        addPlaylist={addPlaylist}/> : null}
    </div>
  );
}

export default withRouter(App);
