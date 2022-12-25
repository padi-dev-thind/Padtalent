'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tests', [{
      id: 1,
      assessment_id: 1,
      game_type_id: 1,
      candidate_id: 1,
      result: 85,
      start_time: new Date(),
      end_time: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      assessment_id: 1,
      game_type_id: 2,
      candidate_id: 1,
      result: 75,
      start_time: new Date(),
      end_time: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },{
      id: 3,
      assessment_id: 1,
      game_type_id: 1,
      candidate_id: 2,
      result: 55,
      start_time: new Date(),
      end_time: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 4,
      assessment_id: 1,
      game_type_id: 2,
      candidate_id: 2,
      result: 100,
      start_time: new Date(),
      end_time: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tests', [ {
      id:[1,2,3,4]
    }])
  }
};

