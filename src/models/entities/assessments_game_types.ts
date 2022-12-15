'use strict';
import {Model} from 'sequelize-typescript'
module.exports = (sequelize, DataTypes) => {
  class assessments_game_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  assessments_game_types.init({
    type: DataTypes.STRING,
    total_time: DataTypes.NUMBER
  }, {
    sequelize,
    paranoid:true,
    modelName: 'assessments_game_types',
  });
  return assessments_game_types;
};