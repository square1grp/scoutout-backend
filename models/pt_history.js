'use strict';
module.exports = (sequelize, DataTypes) => {
    var PTHistory = sequelize.define('PTHistory', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        master_uuid: DataTypes.STRING,
        site: { type: DataTypes.STRING},
        item: DataTypes.STRING,
        brand: { type: DataTypes.STRING, allowNull: true },
        price: { type: DataTypes.DECIMAL},
        currency: { type: DataTypes.STRING, allowNull: true },
        price_per: { type: DataTypes.DECIMAL, allowNull: true },
        per: { type: DataTypes.STRING, allowNull: true },
        plu: { type: DataTypes.STRING, allowNull: true },
        model: { type: DataTypes.STRING, allowNull: true },
        sku: { type: DataTypes.STRING},
        item_url: { type: DataTypes.STRING, allowNull: true },
        source_url: { type: DataTypes.STRING, allowNull: true },
        img_src: { type: DataTypes.STRING, allowNull: true },
        job_number: { type: DataTypes.STRING, allowNull: true },
        category: { type: DataTypes.STRING, allowNull: true },
        created: { type: DataTypes.STRING, allowNull: true },
        updated: { type: DataTypes.STRING, allowNull: true }
    }, {
        indexes: [{
            unique: true,
            fields: ['site', 'sku', 'price']
        }],
        timestamps: false,
        underscored: true,
        tableName: 'pt_history',
    });
    PTHistory.associate = function (models) {
        // associations can be defined here
        // belongs to user
    };
    return PTHistory;
};