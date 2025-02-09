"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Stations", "SiteId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Sites",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Stations", "SiteId");
  },
};
