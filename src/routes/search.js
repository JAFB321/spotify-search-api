const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {

  const { getTracks } = require('../spotify/endpoints/search');

  const data = await getTracks('hallucinate dua lipa', 14);

  res.json(data);

});

module.exports = router;