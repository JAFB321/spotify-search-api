const fetch = require('node-fetch');
const { stringify } = require('querystring');

const { ClientCredentials } = require('../auth');
const { reduceTracks } = require('../dataReducer');

const endpointURL = 'https://api.spotify.com/v1/search';


const fetchEndpoint = (async (queryParams, lastToken) => {

    const doFetch = async (queryParams, token) => {

        try {
            const Options = {
                headers: {
                    'Authorization': `${token_type} ${access_token}`
                }
            };

            // Query Params
            let queryString = "";
            if (queryParams) {
                queryString = '?' + stringify(queryParams);
            }

            // Construye la URL
            const fetchURL = endpointURL + queryString;

            // fetch a la API
            const respuesta = await fetch(fetchURL, Options);
            const data = await respuesta.json();

            return data;

        } catch (error) {
            return {
                error
            }
        }

    };


    let token = lastToken;
    if (!lastToken) {
        token = await ClientCredentials();
    }

    let { error, access_token, token_type } = token;

    if (error) return {
        error
    }

    const data = await doFetch(queryParams, token_type, access_token);
    



});

const getTracks = async (params) => {

    const { track, album, artist, limit } = params;

    let q = track;
    q += album ? ` album:${album}` : '';
    q += artist ? ` artist:${artist}` : '';

    console.log(q);


    const Params = {
        q: q || '',
        type: 'track',
        limit: limit || 20
    };
    const data = await fetchEndpoint(Params);

    if (data.error) {
        return data;
    }
    else {
        return reduceTracks(data);
    }
};



module.exports = {
    fetchEndpoint,
    getTracks
}