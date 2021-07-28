import './App.css';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import HomePage from './Components/HomePage';
import SignUpPage from './Components/SignUpPage';
import '@fontsource/roboto';
import LoginPage from './Components/LoginPage'
import Header from './Components/Header'
import NewPlaylistForm from './Components/NewPlayistForm';
import PlaylistPage from './Components/PlaylistPage'


function App() {

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
    token: token
  }


  useEffect(()=>{
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
    setId(0)
    setUsername("")
    setPlaylists([])
    setSongs([])
    setToken(null)
    localStorage.clear()
    history.push("/login")
  }


  const renderNewPlaylistPage = ()=>{
    return <>
      <NewPlaylistForm addPlaylist={addPlaylist} user={user}/>
    </>
  }

  const addPlaylist = (newPlaylist)=>{
    setPlaylists([...playlists, newPlaylist])
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
      return <Redirect to="/login" />
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
  }

  return (
    <div className="App">
        <Header user={user} handleLogOut={logOut}/>
        <Switch >
          {/* <Route path="/youtube" render={renderYoutube}/> */}
          <Route path="/newPlaylist" render={renderNewPlaylistPage}/>
          <Route path="/playlist/:playlistId" children={renderPlaylistPage}/>
          <Route path="/homepage" render={renderHomePage}/>
          <Route path="/login" render={renderLoginPage}/>
          <Route path="/signup" render={renderSignUpPage} />
          <Route path="/" render={renderLoginPage}/>

          {/* <iframe title="musicPlayer" src="https://open.spotify.com/embed/track/4PuccpuGVKgdiULunPMS95" width="560" height="315" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/lbyyVIIkdeQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
        </Switch>
    </div>
  );
}

export default withRouter(App);
