"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Receitas extends Model {
    static associate(models) {
      // define association here
    }
  }
  Receitas.init(
    {
      descricao: DataTypes.STRING,
      valor: DataTypes.DOUBLE,
      data: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Receitas",
      timestamps: false
    }
  );
  return Receitas;
};
