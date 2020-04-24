'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    return queryInterface.createTable('pt_history', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      master_uuid: Sequelize.TEXT,
      site: { type: Sequelize.TEXT },
      item: Sequelize.TEXT,
      brand: { type: Sequelize.TEXT, allowNull: true },
      price: { type: Sequelize.DECIMAL },
      currency: { type: Sequelize.TEXT, allowNull: true },
      price_per: { type: Sequelize.DECIMAL, allowNull: true },
      per: { type: Sequelize.TEXT, allowNull: true },
      plu: { type: Sequelize.TEXT, allowNull: true },
      model: { type: Sequelize.TEXT, allowNull: true },
      sku: { type: Sequelize.TEXT },
      item_url: { type: Sequelize.TEXT, allowNull: true },
      source_url: { type: Sequelize.TEXT, allowNull: true },
      img_src: { type: Sequelize.TEXT, allowNull: true },
      job_number: { type: Sequelize.TEXT, allowNull: true },
      category: { type: Sequelize.TEXT, allowNull: true },
      created: { type: Sequelize.TEXT, allowNull: true },
      updated: { type: Sequelize.TEXT, allowNull: true }
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    return queryInterface.dropTable('pt_history');
  }
};
