'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });

      CREATE TABLE "job_queue" (
        "site"	TEXT,
        "url"	TEXT UNIQUE,
        "item_count"	INTEGER,
        "url_count"	INTEGER,
        "status"	TEXT,
        "status_err"	TEXT,
        "attempts"	INTEGER,
        "created"	INTEGER,
        "updated"	INTEGER
      );
    */

    return queryInterface.createTable('job_queue', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      site: { type: Sequelize.TEXT, allowNull: true },
      url: { type: Sequelize.TEXT, unique: true },
      item_count: Sequelize.INTEGER,
      url_count: Sequelize.INTEGER,
      status: { type: Sequelize.TEXT, allowNull: true },
      status_err: { type: Sequelize.TEXT, allowNull: true },
      attempts: Sequelize.INTEGER,
      created: Sequelize.TEXT,
      updated: Sequelize.TEXT,
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    return queryInterface.dropTable('job_queue');
  }
};
