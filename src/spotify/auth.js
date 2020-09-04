const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const { spotifyKeys } = require('./credentials');
const { client_id, client_secret } = spotifyKeys;


const ClientCredentials = (async () => {

    try {

        // Forms Parameters
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');

        var authOptions = {
            method: 'POST',
            headers: {
                'Authorization': ('Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')))
            },
            body: params
        };


        const respuesta = await fetch('https://accounts.spotify.com/api/token', authOptions);
        const token = await respuesta.json();

        return token;

    } catch (error) {

        return {
            error
        }
    }

});


module.exports = {
    ClientCredentials
}