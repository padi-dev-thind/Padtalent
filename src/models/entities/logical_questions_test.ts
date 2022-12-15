'use strict';
import {Model } from 'sequelize-typescript'
module.exports = (sequelize, DataTypes) => {
  class logical_questions_test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  logical_questions_test.init({
    type: DataTypes.STRING,
    total_time: DataTypes.NUMBER
  }, {
    sequelize,
    paranoid:true,
    modelName: 'logical_questions_test',
  });
  return logical_questions_test;
};