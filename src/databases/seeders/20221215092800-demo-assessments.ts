'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('assessments', [{
      id: 0,
      name: 'ass1',
      hr_id: 2,
      start_date: new Date(),
      end_date: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 1,
      name: 'ass2', 
      hr_id: 2,
      start_date: new Date(),
      end_date: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      name: 'ass3',
      hr_id: 3,
      start_date: new Date(),
      end_date: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 4,
      name: 'ass4', 
      hr_id: 4,
      start_date: new Date(),
      end_date: new Date(),
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('assessments', [ {
     id:[0,1,2,3]
    }])
  }
};
