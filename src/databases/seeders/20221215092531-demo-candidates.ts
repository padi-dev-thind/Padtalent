'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('candidates', [{
      email: 'eamil_candidate1',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      email:'eamil_candidate2',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      email:'eamil_candidate3',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      email:'eamil_candidate4',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('candidates', [ {
     id:[0,1,2,3]
    }])
  }
};
