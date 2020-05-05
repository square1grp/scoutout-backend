'use strict';

require('dotenv').config();

const config = {
  "development": {
    "use_env_variable": false,
    "username": process.env.PGUSERNAME,
    "password": process.env.PGPASSWORD,
    "database": process.env.PGDATABASE,
    "host": process.env.PGHOST,
    "port": process.env.PGPORT,
    "dialect": "postgres",
    "sync": true
  },
  "test": {
    "use_env_variable": false,
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": false,
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
  }
};

module.exports = config;