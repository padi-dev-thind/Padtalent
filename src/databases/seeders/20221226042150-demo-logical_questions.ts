'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('logical_questions', [{
      statement1: "s1",
      statement2: "s1",
      conclusion: "c1",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      statement1: "s2",
      statement2: "s2",
      conclusion: "c3",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },{
      statement1: "s3",
      statement2: "s3",
      conclusion: "c3",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      statement1: "s4",
      statement2: "s4",
      conclusion: "c4",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      statement1: "s5",
      statement2: "s5",
      conclusion: "c5",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      statement1: "s6",
      statement2: "s6",
      conclusion: "c6",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      statement1: "s7",
      statement2: "s7",
      conclusion: "c7",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      statement1: "s8",
      statement2: "s8",
      conclusion: "c8",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      statement1: "s9",
      statement2: "s9",
      conclusion: "c9",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      statement1: "s10",
      statement2: "s10",
      conclusion: "c10",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      statement1: "s11",
      statement2: "s11",
      conclusion: "c11",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      statement1: "s12",
      statement2: "s12",
      conclusion: "c12",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      statement1: "s13",
      statement2: "s13",
      conclusion: "c13",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('logical_questions', [ {
      hr_id:[0,2]
    }])
  }
};

