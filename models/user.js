'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: DataTypes.TEXT,
    hashed_password: DataTypes.TEXT
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'users',
  });
  User.associate = function (models) {
    // associations can be defined here
    // belongs to user
  };
  return User;
};