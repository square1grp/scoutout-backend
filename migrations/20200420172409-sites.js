'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
      
      CREATE TABLE "sites" (
        "site"	TEXT NOT NULL UNIQUE,
        "url"	TEXT NOT NULL,
        "category"	TEXT,
        "status"	TEXT NOT NULL
      );
    */

    return queryInterface.createTable('sites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      site: { type: Sequelize.TEXT, unique: true },
      url: Sequelize.TEXT,
      category: { type: Sequelize.TEXT, allowNull: true },
      status: Sequelize.TEXT
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    return queryInterface.dropTable('sites');
  }
};
