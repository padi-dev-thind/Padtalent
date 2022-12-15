'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hrs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(128)
      },
      password: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(256)
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING
      },
      logo: {allowNull: false,
        type: Sequelize.TEXT
      },
      company: {
        allowNull: false,
        type: Sequelize.STRING
      },
      company_industry: {
        allowNull: false,
        type: Sequelize.STRING
      },
      company_size: {
        allowNull: false,
        type: Sequelize.INTEGER      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hrs');
  }
};