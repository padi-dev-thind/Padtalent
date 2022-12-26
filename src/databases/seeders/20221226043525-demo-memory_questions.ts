'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('memory_questions', [{
      level: 1,
      data: "<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      level: 2,
      data: "<>",
      created_at: new Date(),
      updated_at: new Date()
    },{
      level: 3,
      data: "<>>",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      level: 4,
      data: "<<><",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      level: 5,
      data: "<><><",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      level: 6,
      data: "<<>>>>",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      level: 8,
      data: "<>><><><",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      level: 9,
      data: "<<><<<><>",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      level: 10,
      data: "<<><><><><",
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('memory_questions', [ {
      id:[1,2]
    }])
  }
};

