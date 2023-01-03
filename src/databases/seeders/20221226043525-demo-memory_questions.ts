'use strict';
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('memory_questions', [{
      id: uuidv4(),
      level: 1,
      data: "<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 2,
      data: "<>",
      created_at: new Date(),
      updated_at: new Date()
    },{
      id: uuidv4(),
      level: 3,
      data: "<>>",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 4,
      data: "<<><",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 5,
      data: "<><><",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 6,
      data: "<<>>>>",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 7,
      data: "<><>>>>",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 8,
      data: "<>><><><",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 9,
      data: "<<><<<><>",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
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

