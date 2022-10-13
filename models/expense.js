'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Expense.belongsTo(models.User),
        Expense.belongsTo(models.Category)
    }
  }
  Expense.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Expense name is required`
        },
        notEmpty: {
          msg: `Expense name is required`
        }
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Amount is required`
        },
        notEmpty: {
          msg: `Amount is required`
        }
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: `Invalid date format`
        },
        notNull: {
          msg: `Date is required`
        },
        notEmpty: {
          msg: `Date is required`
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `CategoryId is required`
        },
        notEmpty: {
          msg: `CategoryId is required`
        }
      },
      references: {
        model: `Categories`,
        key: `id`
      },
      onDelete: `cascade`,
      onUpdate: `cascade`
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `UserId is required`
        },
        notEmpty: {
          msg: `UserId is required`
        }
      },
      references: {
        model: `Users`,
        key: `id`
      },
      onDelete: `cascade`,
      onUpdate: `cascade`
    }
  }, {
    sequelize,
    modelName: 'Expense',
  });
  return Expense;
};