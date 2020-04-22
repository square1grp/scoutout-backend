'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserList = sequelize.define('UserList', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: DataTypes.INTEGER,
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'user_list',
  });
  UserList.associate = function (models) {
    // associations can be defined here
    // belongs to user
  };
  return UserList;
};