'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('candidates_assessments', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
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
            status: {
                allowNull: false,
                type: Sequelize.STRING(20),
                validate: {
                    isIn: [['avaliable', 'accepted', 'out of date']],
                },
                defaultValue: 'avaliable',
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
        await queryInterface.dropTable('candidates_assessments');
    },
};
