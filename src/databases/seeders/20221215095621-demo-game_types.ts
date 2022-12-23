'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('game_types', [{
      id: 1,
      type: 'visual',
      total_time: 90,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      type: 'memory',
      total_time: 90,
      created_at: new Date(),
      updated_at: new Date()
    },]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('game_types', [ {
     id:[1,2]
    }])
  }
};

