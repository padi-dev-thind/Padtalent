'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('candidates_assessments', [{
      assessment_id: 1,
      candidate_id: 1,
      status: 'ready',
      created_at: new Date(),
      updated_at: new Date()
    },
    
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('candidates_assessments', [{
      assessment_id:[0,2]
    }])
  }
};