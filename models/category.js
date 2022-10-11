'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {

    static associate(models) {
      Category.belongsToMany(models.User, {
        through: models.Expense,
        foreignKey: `CategoryId`
      })
    }
  }
  Category.init({
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: `Category name is required`
      },
      notEmpty: {
        msg: `Category name is required`
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};