'use strict';
module.exports = (sequelize, DataTypes) => {
    var Site = sequelize.define('Site', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        site: { type: DataTypes.TEXT, unique: true },
        url: DataTypes.TEXT,
        category: { type: DataTypes.TEXT, allowNull: true },
        status: DataTypes.TEXT
    }, {
        timestamps: false,
        underscored: true,
        tableName: 'sites',
    });
    Site.associate = function (models) {
        // associations can be defined here
        // belongs to user
    };
    return Site;
};