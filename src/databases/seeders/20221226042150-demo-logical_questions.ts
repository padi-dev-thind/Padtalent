'use strict';
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('logical_questions', [
    {
      id: uuidv4(),
      statement1: "s1",
      statement2: "s1",
      conclusion: "c1",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s2",
      statement2: "s2",
      conclusion: "c3",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },{
      id: uuidv4(),
      statement1: "s3",
      statement2: "s3",
      conclusion: "c3",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s4",
      statement2: "s4",
      conclusion: "c4",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s5",
      statement2: "s5",
      conclusion: "c5",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s6",
      statement2: "s6",
      conclusion: "c6",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s7",
      statement2: "s7",
      conclusion: "c7",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s8",
      statement2: "s8",
      conclusion: "c8",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s9",
      statement2: "s9",
      conclusion: "c9",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s10",
      statement2: "s10",
      conclusion: "c10",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s11",
      statement2: "s11",
      conclusion: "c11",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s12",
      statement2: "s12",
      conclusion: "c12",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s13",
      statement2: "s13",
      conclusion: "c13",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s14",
      statement2: "s14",
      conclusion: "c14",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s15",
      statement2: "s15",
      conclusion: "c15",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s16",
      statement2: "s16",
      conclusion: "c16",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s17",
      statement2: "s17",
      conclusion: "c17",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s18",
      statement2: "s18",
      conclusion: "c18",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s19",
      statement2: "s19",
      conclusion: "c19",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s20",
      statement2: "s20",
      conclusion: "c20",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s21",
      statement2: "s21",
      conclusion: "c21",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s22",
      statement2: "s22",
      conclusion: "c22",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s23",
      statement2: "s23",
      conclusion: "c23",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s24",
      statement2: "s24",
      conclusion: "c24",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s25",
      statement2: "s25",
      conclusion: "c25",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },

    {
      id: uuidv4(),
      statement1: "s26",
      statement2: "s26",
      conclusion: "c26",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s27",
      statement2: "s27",
      conclusion: "c27",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s28",
      statement2: "s28",
      conclusion: "c28",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s29",
      statement2: "s29",
      conclusion: "c29",
      answer:"yes",
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      statement1: "s30",
      statement2: "s30",
      conclusion: "c30",
      answer:"no",
      created_at: new Date(),
      updated_at: new Date()
    },
    
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('logical_questions', [ {
      hr_id:[0,2]
    }])
  }
};

