'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tests', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      game_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'game_types',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      candidate_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'candidates',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      assessment_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'assessments',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING(20),
        validate: {
          isIn: [['completed', 'in progress', 'not start', 'archieved']],
        },
        defaultValue: 'not start',
      },
      remaining_time: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 90,
      },
      total_time: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      number_of_questions: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      result: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      start_time: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      end_time: {
        allowNull: true,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('tests');
  },
};
