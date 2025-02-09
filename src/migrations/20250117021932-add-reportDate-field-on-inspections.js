"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Inspections", "reportDate", {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Inspections", "reportDate");
  },
};
