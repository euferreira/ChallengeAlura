"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Receitas",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        descricao: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        valor: {
          allowNull: false,
          type: Sequelize.DOUBLE,
        },
        data: {
          allowNull: false,
          type: Sequelize.DATE,
        }
      }      
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Receitas");
  },
};
