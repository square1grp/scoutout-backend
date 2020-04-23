var express = require('express');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

var router = express.Router();
var { Site, Item, UserList, UserListItem } = require('../models');

router.get('/', function (req, res, next) {
    res.send('API Server is running.')
});

router.get('/sites', async function (req, res, next) {
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
        limit: 25,
        offset: 25 * (pageIdx - 1)
    });

    const totalCount = await Item.count({ where });

    res.status(200).send({ items, pageIdx: pageIdx, totalCount: totalCount })
});

router.get('/user-list', async function (req, res, next) {
    const userId = req.query['userId'];

    if (userId) {
        const _userLists = await UserList.findAll({ where: { user_id: userId } });
        const userLists = await Promise.all(_userLists.map(async (userList) => {
            userListItems = await UserListItem.findAll({ where: { list_id: userList.id }, include: [Item] });

            const items = userListItems.map(userListItem => {
                return userListItem.Item;
            })

            return {
                id: userList.id,
                user_id: userList.user_id,
                items: items
            }
        }));

        res.status(200).send(userLists);
    } else {
        res.status(500).send([]);
    }
});

router.delete('/user-list', async function (req, res, next) {
    const id = req.body['id'];
    const userId = req.body['userId'];

    if (id && userId) {
        await UserList.destroy({ where: { id: id, user_id: userId } });

        res.status(200).send({});
    } else {
        res.status(500).send("id or userId is not provided.");
    }
});

router.post('/user-list', async function (req, res, next) {
    const userId = req.body['userId'];

    if (userId) {
        const userList = await UserList.create({ user_id: userId });

        res.status(200).send(userList);
    } else {
        res.status(500).send("userId is empty.");
    }
});

router.post('/user-list/add-items', async function (req, res, next) {
    const listId = req.body['listId'];
    const itemIds = req.body['itemIds'];

    await Promise.all(itemIds.map((itemId) => UserListItem.findOrCreate({ where: { list_id: listId, item_id: itemId } })));

    userListItems = await UserListItem.findAll({ where: { list_id: listId }, include: [Item] });

    const items = userListItems.map(userListItem => {
        return userListItem.Item;
    })

    res.status(200).send(items)
});

module.exports = router;