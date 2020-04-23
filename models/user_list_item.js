'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserListItem = sequelize.define('UserListItem', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    list_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
    is_watch: { type: DataTypes.BOOLEAN, allowNull: true }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'user_list_item',
  });
  UserListItem.associate = function (models) {
    // associations can be defined here
    // belongs to user

    this.belongsTo(models.Item)
  };
  return UserListItem;
};