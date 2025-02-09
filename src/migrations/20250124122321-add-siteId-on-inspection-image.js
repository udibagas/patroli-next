"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("InspectionImages", "SiteId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Sites",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("InspectionImages", "SiteId");
  },
};
