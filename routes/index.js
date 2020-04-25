var express = require('express');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const bcrypt = require('bcrypt');
// const saltRounds = 8;
const jwt = require('jsonwebtoken');
const moment = require('moment');


var router = express.Router();
var { Site, Item, User, UserList, UserListItem, PTHistory } = require('../models');

router.get('/', function (req, res, next) {
    res.send('API Server is running.')
});

router.post('/login', async function (req, res, next) {
    const username = req.body['username'];
    const password = req.body['password'];

    const user = await User.findOne({ where: { 'username': username } });

    const token = jwt.sign({ user_id: user.id, username: user.username }, 'scoutout-auth');

    bcrypt.compare(password, user.hashed_password, function (err, result) {
        if (result)
            res.status(200).send({ user_id: user.id, token: token });
        else
            res.status(500).send("Wrong credentials");
    });
});

router.post('/verify-token', async function (req, res, next) {
    const token = req.body['token'];

    const user = token ? jwt.verify(token, 'scoutout-auth') : {};

    if (user.user_id) {
        res.status(200).send({ user_id: user.user_id });
    } else {
        res.status(500);
    }
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
                name: userList.name,
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
        const userList = await UserList.create({ user_id: userId, name: `My List ${moment().format("L")}` });

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

router.delete('/user-list/delete-item', async function (req, res, next) {
    const listId = req.body['listId'];
    const itemId = req.body['itemId'];

    await UserListItem.destroy({ where: { list_id: listId, item_id: itemId } });

    res.status(200).send({});
});

router.post('/user-list/change-name', async function (req, res, next) {
    const listId = req.body['listId'];
    const listName = req.body['listName'];

    const isUpdated = await UserList.update({ name: listName }, { where: { id: listId } });

    res.status(isUpdated ? 200 : 500).send({});
})

module.exports = router;