'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('logical_questions_tests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      test_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'tests',
          key: 'id'
        }
      },
      logical_question_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'logical_questions',
          key: 'id'
        }
      },
      question_number: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      candidate_answer: {
        allowNull: true,
        type: Sequelize.STRING(5),
        validate:{
          isIn:[['yes','no']]
        }
      },
      status:{
        allowNull: false,
        type: Sequelize.STRING(20),
        validate:{
          isIn:[['not answer','answering','correct answer','wrong answer' ,'time out', 'skiped']]
        },
        defaultValue:'not answer'
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
    await queryInterface.dropTable('logical_questions_tests');
  }
};