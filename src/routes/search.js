const { Router } = require('express');
const router = Router();

const fetch = require('node-fetch');


router.get('/', async (req, res) => {

    const { client_id, client_secret } = require('../credentials.json');

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
          grant_type: 'client_credentials'
        },
        json: true
      };

    fetch()       

});

module.exports = router;