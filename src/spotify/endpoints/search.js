const fetch = require('node-fetch');
const { stringify } = require('querystring');

const { ClientCredentials } = require('../auth');

const endpointURL = 'https://api.spotify.com/v1/search';


const fetchEndpoint = (async (queryParams) => {

    try {

        const { error, access_token, token_type } = await ClientCredentials();

        if (!error) {

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

        }
        else return {
            error
        }

    } catch (error) {
        return {
            error
        }
    }

});

const getTracks = async (filter, limit) => {

    const Params = {
        q: filter || '',
        type: 'track',
        limit: limit || 20
    }

    const tracks = await fetchEndpoint(Params);

    return tracks;
};

module.exports = {
    getTracks
}