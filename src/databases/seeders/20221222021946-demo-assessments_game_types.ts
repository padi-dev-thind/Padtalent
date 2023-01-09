'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('assessments_game_types', [
      {
        id: '77f63885-4922-4f47-be5c-b97d1cc0ef68',
        assessment_id: '18c8b555-4f6d-44e2-bff6-011b1802538b',
        game_type_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'e7af16f4-c677-4c2a-af27-3f2706fece0e',
        assessment_id: '18c8b555-4f6d-44e2-bff6-011b1802538b',
        game_type_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '4b16a30e-b51e-4e34-a3e1-1d4b77ba4ecf',
        assessment_id: '18c8b555-4f6d-44e2-bff6-054b1802538b',
        game_type_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'b3978350-6bdc-4153-b134-66042cadf8a7',
        assessment_id: '18c8b555-4f6d-44e2-bff6-054b1802538b',
        game_type_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('assessments_game_types', [
      {
        id: [1, 2],
      },
    ]);
  },
};
