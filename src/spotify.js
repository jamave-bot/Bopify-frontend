// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/

export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "https://bopify.netlify.app/"

const clientId = "5b61678e702c48c887de782dc7ecb20a"

const scopes = [
    "user-read-currently-playing",
    "user-read-email",
    "user-read-private",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "playlist-read-private",
    "user-library-read",
    "streaming"

]

export const getTokenFromUrl = ()=>{
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item)=>{
            // #accessToken=mysecretkey&name=somerandomname
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1])

            return initial
        }, {});
}

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`