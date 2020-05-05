const router = require('express').Router();
const moment = require('moment');
var { Item, UserList, UserListItem } = require('../models');

router.get('/', async function (req, res, next) {
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

router.delete('/', async function (req, res, next) {
  const id = req.body['id'];
  const userId = req.body['userId'];

  if (id && userId) {
    await UserList.destroy({ where: { id: id, user_id: userId } });

    res.status(200).send({});
  } else {
    res.status(500).send("id or userId is not provided.");
  }
});

router.post('/', async function (req, res, next) {
  const userId = req.body['userId'];

  if (userId) {
    const userList = await UserList.create({ user_id: userId, name: `My List ${moment().format("L")}` });

    res.status(200).send(userList);
  } else {
    res.status(500).send("userId is empty.");
  }
});

router.post('/add-items', async function (req, res, next) {
  const listId = req.body['listId'];
  const itemIds = req.body['itemIds'];

  await Promise.all(itemIds.map((itemId) => UserListItem.findOrCreate({ where: { list_id: listId, item_id: itemId } })));

  userListItems = await UserListItem.findAll({ where: { list_id: listId }, include: [Item] });

  const items = userListItems.map(userListItem => {
    return userListItem.Item;
  })

  res.status(200).send(items)
});

router.delete('/delete-item', async function (req, res, next) {
  const listId = req.body['listId'];
  const itemId = req.body['itemId'];

  await UserListItem.destroy({ where: { list_id: listId, item_id: itemId } });

  res.status(200).send({});
});

router.post('/change-name', async function (req, res, next) {
  const listId = req.body['listId'];
  const listName = req.body['listName'];

  const isUpdated = await UserList.update({ name: listName }, { where: { id: listId } });

  res.status(isUpdated ? 200 : 500).send({});
})

module.exports = router;