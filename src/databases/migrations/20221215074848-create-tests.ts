'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      game_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'game_types',
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
      assessment_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'assessments',
          key: 'id'
        }
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING(20),
        validate:{
          isIn: [['completed', 'in progress','not start']]
        },
        defaultValue:'not start'
      },
      remaining_time: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 90
      },
      total_time: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      number_of_questions: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      result: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      start_time: {
        allowNull: true,
        type: Sequelize.DATE
      },
      end_time: {
        allowNull: true,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('tests');
  }
};