const router = require('express').Router();
const Sequelize = require('sequelize');
const op = Sequelize.Op;
var { Site, Item, PTHistory } = require('../models');

router.post('/', async function (req, res, next) {
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

  let _items = await Item.findAll({
    where,
    limit: 25,
    offset: 25 * (pageIdx - 1)
  });

  items = await Promise.all(_items.map(async (_item) => {
    const histories = await PTHistory.findAll({ where: { master_uuid: _item.master_uuid } });

    return Object.assign(_item.toJSON(), { histories });
  }));

  const totalCount = await Item.count({ where });

  res.status(200).send({ items, pageIdx: pageIdx, totalCount: totalCount })
});

module.exports = router;