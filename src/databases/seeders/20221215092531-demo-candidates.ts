'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('candidates', [{
      id: 0,
      email: 'eamil_candidate1',
      name: 'can1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1,
      email:'eamil_candidate1',
      name: 'can2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      email:'eamil_candidate1',
      name: 'can2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      email:'eamil_candidate1',
      name: 'can3',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('candidates', [ {
     id:[0,1,2,3]
    }])
  }
};
