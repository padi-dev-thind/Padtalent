'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('candidates_assessments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      assessment_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'assessments',
          key: 'id'
        }
      },
      candidate_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'candidates',
          key: 'id'
        }
      },
      status:{
        allowNull: false,
        type: Sequelize.STRING(20),
      },
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
    await queryInterface.dropTable('candidates_assessments');
  }
};