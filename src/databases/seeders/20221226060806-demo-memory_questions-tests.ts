'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('memory_questions_tests', [{
      test_id:2,
      question_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      test_id:2,
      question_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    },{
      test_id:2,
      question_id: 3,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      test_id:2,
      question_id: 4,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('memory_questions_tests', [ {
      hr_id:[0,2]
    }])
  }
};