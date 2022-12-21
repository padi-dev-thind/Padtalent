'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('game_types', [{
      id: 0,
      type: 'visual',
      total_time: 90,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1,
      type: 'memory',
      total_time: 90,
      createdAt: new Date(),
      updatedAt: new Date()
    },]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('game_types', [ {
     id:[0,1]
    }])
  }
};

