'use strict';
import {Model } from 'sequelize-typescript'
module.exports = (sequelize, DataTypes) => {
  class candidates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  candidates.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    paranoid:true,
    modelName: 'candidates',
  });
  return candidates;
};