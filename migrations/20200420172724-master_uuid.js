'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
      
      CREATE TABLE "master_uuid" (
        "master_uuid"	TEXT NOT NULL UNIQUE,
        "site"	TEXT NOT NULL,
        "id"	TEXT NOT NULL,
        "id_type"	TEXT NOT NULL,
        "created"	TEXT NOT NULL,
        "updated"	TEXT NOT NULL,
        UNIQUE("site","id","id_type"),
        PRIMARY KEY("master_uuid")
      );
    */

    return queryInterface.createTable('master_uuid', {
      master_uuid: { type: Sequelize.TEXT, unique: true, primaryKey: true },
      site: Sequelize.TEXT,
      id: Sequelize.TEXT,
      id_type: Sequelize.TEXT,
      created: Sequelize.TEXT,
      updated: Sequelize.TEXT,
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    return queryInterface.dropTable('master_uuid');
  }
};
