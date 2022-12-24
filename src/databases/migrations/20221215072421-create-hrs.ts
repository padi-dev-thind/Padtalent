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
        type: Sequelize.JSON
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING(256)
      },
      role: {
        allowNull: true,
        type: Sequelize.STRING
      },
      logo: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      company: {
        allowNull: true,
        type: Sequelize.STRING
      },
      company_industry: {
        allowNull: true,
        type: Sequelize.STRING
      },
      company_size: {
        allowNull: true,
        type: Sequelize.INTEGER     
      },
      is_admin: {
        allowNull: true,
        type: Sequelize.BOOLEAN     
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
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