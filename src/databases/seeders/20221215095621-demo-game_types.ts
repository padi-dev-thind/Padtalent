'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('game_types', [
      {
        id: 1,
        type: 'logical',
        total_time: 90,
        description: 'description',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        type: 'memory',
        description: 'description',
        total_time: 90,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('game_types', [
      {
        id: [1, 2],
      },
    ]);
  },
};
