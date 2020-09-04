const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {

  const { ClientCredentials } = require('../spotify/auth');

  const token = await ClientCredentials();

  res.json(token);

});

module.exports = router;