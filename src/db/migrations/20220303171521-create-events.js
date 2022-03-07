'use strict';

const { password } = require('../../config/database');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('events', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            date: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            time: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            place: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            tipo: {
                type: Sequelize.STRING,
                allowNull: false
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

    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('events');
    }
};