"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Despesas extends Model {
    static associate(models) {
      // define association here
    }
  }
  Despesas.init(
    {
      descricao: DataTypes.STRING,
      valor: DataTypes.DOUBLE,
      data: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Despesas",
      timestamps: false
    }
  );
  return Despesas;
};
