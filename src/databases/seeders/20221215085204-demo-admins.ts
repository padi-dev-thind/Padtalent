'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('admins', [{
      id:0,
      name: 'thi',
      password: 'nguyen',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id:1,
      name: 'thi2',
      password: 'pass2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id:2,
      name: 'thi3',
      password: 'pass3',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id:3,
      name: 'thi4',
      password: 'pass4',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('admins', [ {
     id:[0,1,2,3]
    }])
  }
};
