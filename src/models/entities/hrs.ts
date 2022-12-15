'use strict';
import {Model } from 'sequelize-typescript'
module.exports = (sequelize, DataTypes) => {
  class hrs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  hrs.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    logo: DataTypes.STRING,
    company: DataTypes.STRING,
    company_industry: DataTypes.STRING,
    company_size: DataTypes.STRING
  }, {
    sequelize,
    paranoid:true,
    modelName: 'hrs',
  });
  return hrs;
};