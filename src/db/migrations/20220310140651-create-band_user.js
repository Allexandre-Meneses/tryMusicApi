"use strict";

const { password } = require("../../config/database");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("bands_users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      band_id: {
        type: Sequelize.INTEGER,
        references: { model: 'bands', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("band_user");
  },
};
