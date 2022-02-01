const Services = require("./Services");
const database = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class ReceitaService extends Services {
    constructor() {
        super("Receitas");
    }

    /**
     * Insere os dados da receita
     * @param dados
     * @returns {Promise<*|null>}
     */
    async inserirDados(dados) {
        try {
            const result = await this._verificaDadosCadastro(new Date(dados.data), dados.descricao);
            return result === null ? await database[this.nomeModelo].create(dados) : null;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Verifica os dados de cadastro da receita, se já existir no mês, retorna.
     * @private
     * @param {Date} dataReceita
     * @param {string} descricao
     */
    async _verificaDadosCadastro(dataReceita, descricao) {
        try {
            const lastDayOfMonth = new Date(dataReceita.getFullYear(), dataReceita.getMonth() + 1, 0);
            const firstDayOfMonth = new Date(dataReceita.getFullYear(), dataReceita.getMonth(), 1);

            const verificaReceita = await database[this.nomeModelo].findAll({
                where: {
                    descricao: descricao,
                    data: {
                        [Op.between]: [firstDayOfMonth, lastDayOfMonth]
                    }
                }
            });
            return verificaReceita !== null && verificaReceita.length > 0 ? [] : null;
        } catch (e) {
            throw e;
        }
    }

    /**
     * Retorna todas as receitas cadastradas
     * @returns {Promise<<Model[]>>}
     */
    async getDados() {
        try {
            return database[this.nomeModelo].findAll();
        } catch (error) {
            throw Error("Ocorreu um erro", error.message);
        }
    }

    /**
     * Retorna uma receita dado seu ID
     * @param {Number} id
     * @returns {Promise<<Model<any, any>>>}
     */
    async getBydId(id) {
        return await database[this.nomeModelo].findOne({
            where: {
                id: id
            }
        });
    }

    /**
     * Atualiza a receita e realiza a regra do negócio
     * @param id
     * @param dados
     * @returns {Promise<null|*>}
     */
    async updateReceita(id, dados) {
        const resultDados = await this._verificaDadosCadastro(new Date(dados.data), dados.descricao);
        if (resultDados === null) {
            const result = await database[this.nomeModelo].update(dados, {
                where: {
                    id: id
                }
            });
            return result > 0 ? await this.getBydId(id) : null;
        }
        return null;
    }

    /**
     * Exclui uma receita
     * @param {Number} id
     * @returns {Promise<null |{send: string}>}
     */
    async deleteReceita(id) {
        const result = await database[this.nomeModelo].destroy({
            where: {
                id: id
            }
        });
        return result > 0 ?  {send: "Não foi encontrado nenhuma receita."} : null;
    }
}

module.exports = ReceitaService;
