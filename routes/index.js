var express = require('express');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

var router = express.Router();
var { Site, Item } = require('../models');

router.get('/', function (req, res, next) {
    res.send('API Server is running.')
});

router.get('/get-sites', async function (req, res, next) {
    const sites = await Site.findAll({ where: { 'status': 'active' } });
    res.status(200).send(sites);
});

router.post('/search-items', async function (req, res, next) {
    const categories = req.body['categories'];
    let sites = req.body['sites'];
    const keyword = req.body['keyword'];
    const min_price = req.body['min_price'];
    const max_price = req.body['max_price'];

    sites = await Site.findAll({ where: { id: { [op.in]: sites } } });
    sites = sites.map(site => site.site);

    let where = {}
    if (sites.length)
        where['site'] = { [op.in]: sites }

    if (keyword) {
        const col_names = ['item', 'category'];

        col_names.map(col_name => {
            where[col_name] = Sequelize.where(Sequelize.fn('LOWER', Sequelize.col(col_name)), 'LIKE', '%' + keyword.toLowerCase() + '%');
        });
    }

    if (min_price && max_price) {
        where['price'] = { [op.between]: [min_price, max_price] }
    } else if (min_price) {
        where['price'] = { [op.gte]: min_price }
    } else if (max_price) {
        where['price'] = { [op.lte]: max_price }
    }

    let items = await Item.findAll({
        where,
        limit: 10
    });

    res.status(200).send(items)
});

module.exports = router;