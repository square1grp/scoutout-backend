'use strict';
module.exports = (sequelize, DataTypes) => {
    var SiteProperty = sequelize.define('SiteProperty', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        site: DataTypes.TEXT,
        property: DataTypes.TEXT,
        value: DataTypes.TEXT,
        active: DataTypes.TEXT,
        description: DataTypes.TEXT
    }, {
        underscored: true,
        tableName: 'site_properties',
    });
    SiteProperty.associate = function (models) {
        // associations can be defined here
        // belongs to user
    };
    return SiteProperty;
};