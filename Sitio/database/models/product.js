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
      Product.belongsTo(models.Section,{
        as : 'section',
       
        foreignKey : 'sectionId'
      })


      Product.hasMany(models.Image,{
        as : 'images',
       
        foreignKey : 'productId'
      })
     
    }
  };
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    discount: DataTypes.STRING,
    sectionId: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};