const router = require('express').Router();
var { Site } = require('../models');

router.get('/', async function (req, res, next) {
  const sites = await Site.findAll({ where: { 'status': 'active' } });
  res.status(200).send(sites);
});

module.exports = router;