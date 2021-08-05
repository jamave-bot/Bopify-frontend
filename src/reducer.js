export const initialState = {
    spotifyUser:null,
    // Remove after
    spotifyToken: "",
    spotifyPlaylists: [],
    bopifyUserId: 0,
    bopifyUsername: "",
    bopifyPlaylists:[],
    bopifySongs: [],
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
        case "SET_BOPIFY_PLAYLISTS":
            return{
                ...state,
                bopifyPlaylists: action.bopifyPlaylists
            }
        case "SET_DISCOVER_WEEKLY":
            return{
                ...state,
                discover_weekly: action.discover_weekly
            }
        case "SET_BOPIFY_ID":
            return{
                ...state,
                bopifyUserId: action.bopifyUserId
            }
        case 'LOGOUT':
            return initialState
            
        default:
            return state
    }
}

export default reducer;