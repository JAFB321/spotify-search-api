const { Router } = require('express');
const router = Router();

const { getTracks } = require('../spotify/endpoints/search');

router.get('/tracks/', async (req, res) => {

  const { q, limit } = req.query;
  const data = await getTracks(q, limit);

  res.json(data);
});

module.exports = router;