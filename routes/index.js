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
    const minPrice = req.body['minPrice'];
    const maxPrice = req.body['maxPrice'];
    const pageIdx = req.body['pageIdx'] || 1;

    sites = await Site.findAll({ where: { id: { [op.in]: sites } } });
    sites = sites.map(site => site.site);

    let where = {}
    if (sites.length)
        where['site'] = { [op.in]: sites }

    if (keyword) {
        ['item', 'category'].map(colName => {
            where[colName] = Sequelize.where(Sequelize.fn('LOWER', Sequelize.col(colName)), 'LIKE', '%' + keyword.toLowerCase() + '%');
        });
    }

    if (minPrice && maxPrice) {
        where['price'] = { [op.between]: [minPrice, maxPrice] }
    } else if (minPrice) {
        where['price'] = { [op.gte]: minPrice }
    } else if (maxPrice) {
        where['price'] = { [op.lte]: maxPrice }
    }

    let items = await Item.findAll({
        where,
        limit: 10,
        offset: 10 * (pageIdx - 1)
    });

    const totalCount = await Item.count({ where });
    const totalPages = Math.ceil(totalCount / 10);

    res.status(200).send({ items, pageIdx: pageIdx, totalPages: totalPages })
});

module.exports = router;