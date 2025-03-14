"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "SiteId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Sites",
        key: "id",
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("Users", "SiteId");
  },
};
