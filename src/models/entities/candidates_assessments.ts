'use strict';
import {Model } from 'sequelize-typescript'
module.exports = (sequelize, DataTypes) => {
  class candidates_assessments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  candidates_assessments.init({
    type: DataTypes.STRING,
    total_time: DataTypes.NUMBER
  }, {
    sequelize,
    paranoid:true,
    modelName: 'candidates_assessments',
  });
  return candidates_assessments;
};