'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('hrs_game_types', [
            {
                id: '1a7539a0-1cab-4669-9f3d-31a807832616',
                hr_id: '1f1414f7-d5f5-42c4-b59c-35e3d16b634d',
                game_type_id: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '1a7539a0-1cab-4669-9f3d-31d80783261j',
                hr_id: '1f1414f7-d5f5-42c4-b59c-35e3d16b634d',
                game_type_id: 2,
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('hrs_game_types', [
            {
                hr_id: [],
            },
        ]);
    },
};
