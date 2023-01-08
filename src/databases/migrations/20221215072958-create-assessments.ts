'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assessments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      hr_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'hrs',
          key: 'id',
          
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      link: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: `Padtalent/invite/${this.id}`
        
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      is_archived: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      start_date: {
        allowNull: true,
        type: Sequelize.DATE
      },
      end_date: {
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
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('assessments');
  }
};