'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('logical_questions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      statement1: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
      statement2: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
      answer: {
        allowNull: false,
        type: Sequelize.STRING(5),
        validate: {
          isIn: [['yes', 'no']],
        },
      },
      conclusion: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('logical_questions');
  },
};
