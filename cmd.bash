#!/usr/bin/bash
node_modules/.bin/sequelize db:migrate && node_modules/.bin/sequelize db:seed && node app.js