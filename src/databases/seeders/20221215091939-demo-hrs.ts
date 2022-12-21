'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('hrs', [{
      id:0,
      name: 'hr1',
      password: 'pass1',
      email: 'hr@1',
      role: 'hr',
      company: 'pad',
      logo:'logo',
      company_industry: 'tech',
      company_size: 40,
      is_admin:true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:2,
      name: 'hr2',
      password: 'pass2',
      email: 'hr@2',
      role: 'hr',
      company: 'pad',
      logo:'logo',
      company_industry: 'tech',
      company_size: 20,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:3,
      name: 'hr3',
      password: 'pass3',
      email: 'hr@3',
      role: 'hr',
      company:' pad',
      logo:'logo',
      company_industry:' tech',
      company_size: 20,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id:4,
      name: 'hr4',
      password: 'pass4',
      email: 'hr@4',
      role: 'hr',
      company: 'pad',
      logo:'logo',
      company_industry: 'tech',
      company_size: 80,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('hrs', [ {
      id:[0,1,2,3,4]
     }])
   }
};
