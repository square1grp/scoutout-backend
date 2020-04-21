'use strict';
module.exports = (sequelize, DataTypes) => {
    var SiteURL = sequelize.define('SiteURL', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        site: DataTypes.TEXT,
        url: DataTypes.TEXT,
        active: DataTypes.TEXT,
        description: DataTypes.TEXT
    }, {
        underscored: true,
        tableName: 'site_urls',
    });
    SiteURL.associate = function (models) {
        // associations can be defined here
        // belongs to user
    };
    return SiteURL;
};