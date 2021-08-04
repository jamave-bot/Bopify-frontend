export const initialState = {
    spotifyUser:null,
    // Remove after
    spotifyToken: "",
    spotifyPlaylists: [],
    playing: false,
    item: null, 
};

const reducer = (state, action) =>{
    console.log(action)
    // Action -> type, [payload]

    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                spotifyUser: action.spotifyUser
            }
        case 'SET_TOKEN':
            return {
                ...state,
                spotifyToken: action.spotifyToken
            }
        case 'SET_PLAYLISTS':
            return{
                ...state,
                spotifyPlaylists: action.spotifyPlaylists
            }
        case 'LOGOUT':
            return initialState
            
        default:
            return state
    }
}

export default reducer;