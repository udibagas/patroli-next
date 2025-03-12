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

  async down(queryInterface) {
    await queryInterface.removeColumn("Inspections", "reportDate");
  },
};
