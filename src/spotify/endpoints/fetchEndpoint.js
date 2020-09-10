const fetch = require('node-fetch');
const { stringify } = require('querystring');
const colors = require('colors/safe');

const { ClientCredentials } = require('../auth');


const doFetch = async (endpointURL, queryParams, token_type, access_token) => {

    try {
        const Options = {
            headers: {
                'Authorization': `${token_type} ${access_token}`
            }
        };

        // Query Params
        let queryString = '';
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

const fetchEndpoint = (async (endpointURL, queryParams, lastToken) => {

    let token = lastToken;
    if (!lastToken.access_token) {
        token = await ClientCredentials();
    }

    let { error, access_token, token_type } = token;
    console.log(colors.yellow(token));
    
    if (error) return {
        error
    }

    let data = await doFetch(endpointURL, queryParams, token_type, access_token);
    
    error = data.error;
    if (error) {
        if (error.status == 401) {
            console.log(colors.blue(error));

            // si el error fue Unathorized se obtienen las credenciales otra vez
            token = await ClientCredentials();
            console.log(colors.green(token));
            
            ({ error, access_token, token_type } = token);
            if (error) return {
                error
            }
            
            data = await doFetch(endpointURL, queryParams, token_type, access_token); 
            console.log(colors.red('data'));
            
        }
    }

    return {
        ...data,
        token
    }

});


module.exports = {
    fetchEndpoint
}