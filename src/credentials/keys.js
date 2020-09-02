
const getSpotifyKeys = (() => {
        
    // keys almacenadas en archivo .env (utilice el modulo node dotenv)
    return{
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    }
})