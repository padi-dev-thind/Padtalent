'use strict';
import {Model } from 'sequelize-typescript'
module.exports = (sequelize, DataTypes) => {
  class hrs_game_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  hrs_game_types.init({
    type: DataTypes.STRING,
    total_time: DataTypes.NUMBER
  }, {
    sequelize,
    paranoid:true,
    modelName: 'hrs_game_types',
  });
  return hrs_game_types;
};