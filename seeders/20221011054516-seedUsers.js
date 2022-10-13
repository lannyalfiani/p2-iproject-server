'use strict';

const { createHashFromPassword } = require("../helpers/bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require(`../data/users.json`).map((el) => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.password = createHashFromPassword(el.password)
      return el
    })

    await queryInterface.bulkInsert('Users', data, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})

  }
};
