'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Image,{
         as : 'images',
         foreignKey : 'productsId'
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    height: DataTypes.DECIMAL,
    time: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    materialId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    view : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};