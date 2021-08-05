import React from 'react'
import '../CSS/Body.css'
import SpotifyHeader from './SpotifyHeader'
import SearchRow from './SearchRow';

// console.log("😫😫😫😫😫😫THIs is the YT api: ", process.env.REACT_APP_YOUTUBE_KEY)



function SearchPage({spotify}) {
    const [searchVids, setSearchVids] = React.useState([])
    const API_KEY = process.env.REACT_APP_YOUTUBE_KEY
    // console.log("this is discover weekly 😁😁😁😀😁😁😁🤣😎 : ", discover_weekly )


    const setSearch = (newSearch)=>{
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${newSearch}&key=${API_KEY}`)
                .then(res=>res.json())
                .then(videos => {
                    setSearchVids(videos.items)
                    console.log("THESE ARE THE VIDS BOIIII: ", videos.items)
                })
    }

    // getVideos(API_KEY)
    // console.log(term)

    return (
        <div className="body">
            <SpotifyHeader spotify={spotify} setSearch={setSearch}/>

            <div className="body_info">
                <img src="https://www.freeiconspng.com/uploads/youtube-logo-png-transparent-image-5.png" alt="youtube logo"/>

                <div className="body_infoText">
                    {/* <strong>Search for YouTube Songs</strong> */}
                    <h2>YouTube Search</h2>
                    {/* <p>{discover_weekly?.description}</p> */}
                </div>

            </div>

            <div className="body_songs">
                {/* <div className="body_icons">
                </div> */}

                {searchVids? 
                    searchVids.map(video=>(<SearchRow video={video}/>))
                    :
                    null
                }
            </div>

        </div>
    )
}

export default SearchPage
