'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require(`../data/expenses.json`).map((el) => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('Expenses', data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Expenses', null, {})

  }
};

// 20221011054528-seedExpenses.js