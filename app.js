const express = require('express')
const port = process.env.PORT || '3000';
const routes = require('./routes/index');
const models = require('./models');
const cors = require('cors')
const bodyParser = require('body-parser')



models.sequelize.sync().then(function () {
    const app = express();
    app.use(cors());
    app.use(bodyParser());
    app.use('/', routes);
    app.listen(port, () => console.log(`ScoutOut API server listening at http://localhost:${port}`));
})

