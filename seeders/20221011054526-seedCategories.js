'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require(`../data/categories.json`).map((el) => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('Categories', data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {})

  }
};
