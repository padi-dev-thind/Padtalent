'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('memory_questions_tests', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      test_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'tests',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      memory_question_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'memory_questions',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      candidate_answer: {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      question_number: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING(20),
        validate: {
          isIn: [
            ['not answer', 'answering', 'correct answer', 'wrong answer', 'time out', 'skiped'],
          ],
        },
        defaultValue: 'not answer',
      },
      is_showed_data: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('memory_questions_tests');
  },
};
