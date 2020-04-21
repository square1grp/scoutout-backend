var express = require('express');
var router = express.Router();
var { Site } = require('../models');

router.get('/', function (req, res, next) {
    res.send('API Server is running.')
});

router.get('/get-sites', function (req, res, next) {
    Site.findAll().then(sites => {
        res.status(200).send(sites);
    });
});

router.post('/search-items', function (req, res, next) {
    console.log(req.body);
});

module.exports = router;