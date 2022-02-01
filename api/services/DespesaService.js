const Services = require("./Services");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class DespesaService extends Services {
    constructor() {
        super("Despesas");
    }
}

module.exports = DespesaService;
