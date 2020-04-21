'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });

      CREATE TABLE "items_latest" (
        "master_uuid"	TEXT NOT NULL UNIQUE,
        "site"	TEXT NOT NULL,
        "item"	TEXT NOT NULL,
        "brand"	TEXT,
        "price"	REAL NOT NULL,
        "currency"	TEXT,
        "price_per"	REAL,
        "per"	TEXT,
        "plu"	TEXT,
        "model"	TEXT,
        "sku"	TEXT NOT NULL,
        "item_url"	TEXT,
        "source_url"	TEXT,
        "img_src"	TEXT,
        "job_number"	TEXT,
        "category"	TEXT,
        "created"	TEXT,
        "updated"	TEXT
      );
    */

    return queryInterface.createTable('items_latest', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      master_uuid: { type: Sequelize.TEXT, unique: true },
      site: Sequelize.TEXT,
      item: Sequelize.TEXT,
      brand: { type: Sequelize.TEXT, allowNull: true },
      price: Sequelize.DECIMAL,
      currency: { type: Sequelize.TEXT, allowNull: true },
      price_per: { type: Sequelize.DECIMAL, allowNull: true },
      per: { type: Sequelize.TEXT, allowNull: true },
      plu: { type: Sequelize.TEXT, allowNull: true },
      model: { type: Sequelize.TEXT, allowNull: true },
      sku: Sequelize.TEXT,
      item_url: { type: Sequelize.TEXT, allowNull: true },
      source_url: { type: Sequelize.TEXT, allowNull: true },
      img_src: { type: Sequelize.TEXT, allowNull: true },
      job_number: { type: Sequelize.TEXT, allowNull: true },
      category: { type: Sequelize.TEXT, allowNull: true },
      created: { type: Sequelize.TEXT, allowNull: true },
      updated: { type: Sequelize.TEXT, allowNull: true }
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    return queryInterface.dropTable('items_latest');
  }
};
