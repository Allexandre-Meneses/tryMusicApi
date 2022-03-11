"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("bands", "event_id", {
      type: Sequelize.INTEGER,
      references: { model: "events", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("event_id");
  },
};
