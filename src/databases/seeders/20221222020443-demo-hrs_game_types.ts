'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('hrs_game_types', [{
      hr_id: 0,
      game_type_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      hr_id: 0,
      game_type_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    },{
      hr_id: 2,
      game_type_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      hr_id: 2,
      game_type_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('hrs_game_types', [ {
      hr_id:[0,2]
    }])
  }
};

