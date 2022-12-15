'use strict';
import {Model } from 'sequelize-typescript'
module.exports = (sequelize, DataTypes) => {
  class tests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tests.init({
    type: DataTypes.STRING,
    total_time: DataTypes.NUMBER
  }, {
    sequelize,
    paranoid:true,
    modelName: 'tests',
  });
  return tests;
};