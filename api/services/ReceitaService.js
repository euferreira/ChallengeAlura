const Services = require("./Services");
const database = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require('moment');

class ReceitaService extends Services {
  constructor() {
    super("Receitas");
  }

  async inserirDados(dados) {
    try {
      const dataInserida = new Date(dados.data);
      const hoje = moment().format();
      console.log(dataInserida);
      console.log(hoje);

      //verifica se a receita já foi inserida no mês
      const verificaReceita = await database[this.nomeModelo].findOne({
        where:  {
          descricao : dados.descricao
        }
      });

      if (verificaReceita !== null) {
        return verificaReceita;
      }

      return await database[this.nomeModelo].create(dados);
    } catch (e) {
      throw Error("Ocorreu um erro", e.message);
    }
  }

  async getDados() {
    try {
      return database[this.nomeModelo].findAll();
    }
    catch (error) {
      throw Error("Ocorreu um erro", error.message);
    }
  }

  
}

module.exports = ReceitaService;
