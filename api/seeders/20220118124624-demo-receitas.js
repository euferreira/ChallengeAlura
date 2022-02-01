module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Receitas", [
      {
        descricao: "Água",
        valor: 200,
        data: new Date(2022, 01, 18, 15, 00, 00),
      },
      {
        descricao: "Luz",
        valor: 200,
        data: new Date(2021, 12, 10, 14, 00, 00),
      },
      {
        descricao: "Telefone",
        valor: 200,
        data: new Date(2021, 12, 7, 14, 00, 00),
      },
      {
        descricao: "Supermercado",
        valor: 200,
        data: new Date(2021, 11, 10, 14, 00, 00),
      },
      {
        descricao: "Água",
        valor: 200,
        data: new Date(2021, 11, 10, 15, 00, 00),
      },
      {
        descricao: "Diversos",
        valor: 200,
        data: new Date(2021, 11, 10, 15, 00, 00),
      },
      {
        descricao: "Luz",
        valor: 200,
        data: new Date(2022, 01, 03, 15, 00, 00),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
