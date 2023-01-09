'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('assessments', [
      {
        id: '18c8b555-4f6d-44e2-bff6-011b1802538b',
        hr_id: '1f1414f7-d5f5-42c4-b59c-35e3d16b634d',
        link: 'Padtalent/test/18c8b555-4f6d-44e2-bff6-011b1802538b',
        name: 'ass1',
        start_date: new Date(),
        end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '18c8b555-4f6d-44e2-bff6-054b1802538b',
        hr_id: '1f1414f7-d5f5-42c4-b59c-35e3d16b634d',
        link: 'Padtalent/test/18c8b555-4f6d-44e2-bff6-054b1802538b',
        name: 'ass2',
        start_date: new Date(),
        end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '18c8b555-4f6d-44e2-bff6-032b1802538b',
        hr_id: '1f1414f7-d5f5-42c4-b59c-35e3d16b634d',
        link: 'Padtalent/test/18c8b555-4f6d-44e2-bff6-032b1802538b',
        name: 'ass3',
        start_date: new Date(),
        end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('assessments', [
      {
        id: [0, 1, 2, 3],
      },
    ]);
  },
};
