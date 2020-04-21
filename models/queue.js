'use strict';
module.exports = (sequelize, DataTypes) => {
    var Queue = sequelize.define('Queue', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        file: DataTypes.TEXT,
        status: DataTypes.TEXT
    }, {
        underscored: true,
        tableName: 'queue',
    });
    Queue.associate = function (models) {
        // associations can be defined here
        // belongs to user
    };
    return Queue;
};