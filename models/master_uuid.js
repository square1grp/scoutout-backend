'use strict';
module.exports = (sequelize, DataTypes) => {
    var MasterUUID = sequelize.define('MasterUUID', {
        master_uuid: { type: DataTypes.TEXT, unique: true, primaryKey: true },
        site: DataTypes.TEXT,
        id: DataTypes.TEXT,
        id_type: DataTypes.TEXT,
        created: DataTypes.TEXT,
        updated: DataTypes.TEXT,
    }, {
        underscored: true,
        tableName: 'master_uuid',
    });
    MasterUUID.associate = function (models) {
        // associations can be defined here
        // belongs to user
    };
    return MasterUUID;
};