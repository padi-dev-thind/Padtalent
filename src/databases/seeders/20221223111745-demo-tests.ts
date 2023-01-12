'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        //   return queryInterface.bulkInsert('tests', [
        //     {
        //     assessment_id: 1,
        //     game_type_id: 1,
        //     candidate_id: 1,
        //     total_time: 90,
        //     number_of_questions: 30,
        //     status: 'completed',
        //     result: 85,
        //     start_time: new Date(),
        //     end_time: new Date(),
        //     created_at: new Date(),
        //     updated_at: new Date()
        //   },
        //   {
        //     assessment_id: 1,
        //     game_type_id: 2,
        //     candidate_id: 1,
        //     total_time: 90,
        //     number_of_questions: 30,
        //     status: 'in progress',
        //     start_time: new Date(),
        //     end_time: new Date(),
        //     created_at: new Date(),
        //     updated_at: new Date()
        //   },{
        //     assessment_id: 1,
        //     game_type_id: 1,
        //     candidate_id: 2,
        //     total_time: 90,
        //     number_of_questions: 30,
        //     status: 'not start',
        //     start_time: new Date(),
        //     end_time: new Date(),
        //     created_at: new Date(),
        //     updated_at: new Date()
        //   },
        //   {
        //     assessment_id: 1,
        //     game_type_id: 2,
        //     candidate_id: 2,
        //     total_time: 90,
        //     result: 100,
        //     number_of_questions: 30,
        //     status: 'completed',
        //     start_time: new Date(),
        //     end_time: new Date(),
        //     created_at: new Date(),
        //     updated_at: new Date()
        //   }
        // ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('tests', [
            {
                id: [1, 2, 3, 4],
            },
        ]);
    },
};
