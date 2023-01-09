'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('candidates_assessments', [
      {
        id: 'b1178f33-6e3c-4047-aeda-394d086947c3',
        assessment_id: '18c8b555-4f6d-44e2-bff6-011b1802538b',
        candidate_id: '7f0480fc-c745-4234-bef7-daf3d40060ae',
        status: 'ready',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '9bed0064-cc26-4371-a1a0-c5ab0495174e',
        assessment_id: '18c8b555-4f6d-44e2-bff6-011b1802538b',
        candidate_id: '1a9d2daa-37e2-4d3b-b0e6-4205caa9d7c4',
        status: 'ready',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '16d53c46-05e8-45b1-a127-599ad4069a33',
        assessment_id: '18c8b555-4f6d-44e2-bff6-011b1802538b',
        candidate_id: '5b2fff35-b828-46d7-ac7d-1b4765e3a876',
        status: 'ready',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('candidates_assessments', [
      {
        assessment_id: [1, 2, 3],
      },
    ]);
  },
};
