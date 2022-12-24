'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('assessments_game_types', [{
      assessment_id: 1,
      game_type_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      assessment_id: 2,
      game_type_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },{
      assessment_id: 2,
      game_type_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      assessment_id: 1,
      game_type_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('assessments_game_types', [ {
      id:[1,2]
    }])
  }
};

