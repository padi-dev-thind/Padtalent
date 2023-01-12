'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('candidates', [
            {
                id: '7f0480fc-c745-4234-bef7-daf3d40060ae',
                email: 'email_candidate1@gmail.com',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '1a9d2daa-37e2-4d3b-b0e6-4205caa9d7c4',
                email: 'email_candidate2@gmail.com',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: '5b2fff35-b828-46d7-ac7d-1b4765e3a876',
                email: 'email_candidate3@gmail.com',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 'a16d80a4-0aa8-4590-a00b-de28178fa132',
                email: 'email_candidate4@gmail.com',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('candidates', [
            {
                id: [0, 1, 2, 3],
            },
        ]);
    },
};
