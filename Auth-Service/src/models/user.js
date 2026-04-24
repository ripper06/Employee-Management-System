'use strict';
const {
  Model,
  DATE
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.UserCredential,{
        foreignKey : 'user_id',
        onDelete: 'CASCADE'
      })
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    role:{
      type: DataTypes.ENUM('ADMIN','HR','EMPLOYEE'),
      defaultValue: 'EMPLOYEE'
    },
    last_login_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    login_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};