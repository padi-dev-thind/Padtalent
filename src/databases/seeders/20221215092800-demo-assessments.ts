'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('assessments', [{
      id: 0,
      name: 'ass1',
      hr_id: 0,
      start_date: new Date(),
      end_date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 1,
      name: 'ass2', 
      hr_id: 2,
      start_date: new Date(),
      end_date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'ass3',
      hr_id: 3,
      createdAt: new Date(),
      start_date: new Date(),
      end_date: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      name: 'ass4', 
      hr_id: 4,
      start_date: new Date(),
      end_date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('assessments', [ {
     id:[0,1,2,3]
    }])
  }
};
