'use strict';
module.exports = (sequelize, DataTypes) => {
    var Item = sequelize.define('Item', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        master_uuid: { type: DataTypes.TEXT, unique: true },
        site: DataTypes.TEXT,
        item: DataTypes.TEXT,
        brand: { type: DataTypes.TEXT, allowNull: true },
        price: DataTypes.DECIMAL,
        currency: { type: DataTypes.TEXT, allowNull: true },
        price_per: { type: DataTypes.DECIMAL, allowNull: true },
        per: { type: DataTypes.TEXT, allowNull: true },
        plu: { type: DataTypes.TEXT, allowNull: true },
        model: { type: DataTypes.TEXT, allowNull: true },
        sku: DataTypes.TEXT,
        item_url: { type: DataTypes.TEXT, allowNull: true },
        source_url: { type: DataTypes.TEXT, allowNull: true },
        img_src: { type: DataTypes.TEXT, allowNull: true },
        job_number: { type: DataTypes.TEXT, allowNull: true },
        category: { type: DataTypes.TEXT, allowNull: true },
        created: { type: DataTypes.TEXT, allowNull: true },
        updated: { type: DataTypes.TEXT, allowNull: true }
    }, {
        timestamps: false,
        underscored: true,
        tableName: 'items_latest',
    });
    Item.associate = function (models) {
        // associations can be defined here
        // belongs to user
    };
    return Item;
};