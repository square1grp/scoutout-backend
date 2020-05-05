var router = require('express').Router();

const sitesRoutes = require('./user');
const searchItemsRoutes = require('./search-items');
const userRoutes = require('./user');
const userListRoutes = require('./user-list');

router.get('/', function (req, res, next) {
    res.send('API Server is running.')
});

router.use('/sites', sitesRoutes);
router.use('/search-items', searchItemsRoutes);
router.use('/user', userRoutes);
router.use('/user-list', userListRoutes);

module.exports = router;