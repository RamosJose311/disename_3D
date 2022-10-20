'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rol: DataTypes.BOOLEAN,
    dateBirth: DataTypes.DATE,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
    description: DataTypes.TEXT,
    genderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};