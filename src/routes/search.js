const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {

  const { fetchEndpoint } = require('../spotify/endpoints/search');

  const data = await fetchEndpoint();

  res.json(data);

});

module.exports = router;