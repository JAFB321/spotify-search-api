const { Router } = require('express');
const router = Router();

const { getTracks } = require('../spotify/endpoints/search');

router.get('/tracks/', async (req, res) => {

  console.log(req.get('host'));

  const { track, album, artist, limit } = req.query;
  const params = {
    track,
    album,
    artist,
    limit
  };

  const token = {
    access_token: 'sa2', 
    token_type: 'Bearer'
  }

  const data = await getTracks(params, token);
  

  res.json(data);
});

module.exports = router;