'use strict';
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('memory_questions', [
    {
      id: uuidv4(),
      level: 1,
      data: "<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 1,
      data: ">",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 2,
      data: "<>",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 2,
      data: "<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 2,
      data: ">>",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 2,
      data: "<>",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 3,
      data: "<>>",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 3,
      data: ">>>",
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
      level: 4,
      data: "<>><",
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
      level: 5,
      data: "<><><",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 6,
      data: "<<><>>",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 6,
      data: "><>>>>",
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
      level: 7,
      data: "<><<><<",
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
      level: 8,
      data: "<><<<<><",
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
      level: 9,
      data: "<<<<<<><>",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 10,
      data: "<<><><><><",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 10,
      data: "<<><><><<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 11,
      data: "<<><><><<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 11,
      data: "<<>>><<<><<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 12,
      data: "<<><>><><<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 12,
      data: "<<<<<<<<><<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 13,
      data: "<<><>>>>>><<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 13,
      data: "<>><<<<<><<<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 14,
      data: "<<><>>>><>><<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 14,
      data: "<>><<<<<>><<<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 15,
      data: "<<><<>>>><>><<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 15,
      data: "<>><<<<<>>><<<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 16,
      data: "<<><>>>>><>><<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 16,
      data: "<>><<<<<>>><<<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 17,
      data: "<<<<>>>>><>><<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 18,
      data: "<>>><<<<<>>><<<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 19,
      data: "<<<><>>>>><>><<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 20,
      data: "<>>><<<<<<<>>><<<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 21,
      data: "<<>>><><>>>>><>><<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 22,
      data: "<><<<>><<<<<<<>>><<<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 23,
      data: "<<<><<><><>>>>>><>><<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 24,
      data: "<>>><<><<><><<<<<<>>><<<",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      level: 25,
      data: "<<><><><<><><><>>>>><>><<<",
      created_at: new Date(),
      updated_at: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('memory_questions', [ {
      id:[1,2]
    }])
  }
};

