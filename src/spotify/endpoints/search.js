const fetch = require('node-fetch');
const { stringify } = require('querystring');

const { ClientCredentials } = require('../auth');

const endpointURL = 'https://api.spotify.com/v1/search';


const fetchEndpoint = (async (queryParams) => {

    const { error, access_token, token_type } = await ClientCredentials();

    if (!error) {
        

        const Options = {
            headers: {
                'Authorization': `${token_type} ${access_token}`
            }
        };

        const queryString = '';
        const respuesta = await fetch('https://api.spotify.com/v1/search?q=hallucinate&type=track', Options);
        const data = await respuesta.json();

        return data;
    }

});

module.exports = {
    fetchEndpoint
}