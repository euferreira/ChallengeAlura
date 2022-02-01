const database = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class Services {
    constructor(nomeModelo) {
        this.nomeModelo = nomeModelo;
    }

    /**
     * Retorna todos os registros possíveis
     * @param where
     * @returns {Promise<*|<Model[]>>}
     */
    async findAll(where = {}) {
        return database[this.nomeModelo].findAll({where: {...where}});
    }

    /**
     * Retorna apenas um dado
     * @param where
     * @returns {Promise<*|<Model<any, any>>>}
     */
    async findOne(where = {}) {
        return database[this.nomeModelo].findOne({where: {...where}});
    }

    /**
     * Cria no banco o dado
     * @param dados
     * @returns {Promise<dados>}
     */
    async criar(dados) {
        const result = await this._validaMes(new Date(dados.data), dados.descricao);
        return result === null ? await database[this.nomeModelo].create(dados) : null;
    }

    /**
     * Atualiza os dados no banco
     * @param dados
     * @param where
     * @param transacao
     * @returns {Promise<*>}
     */
    async update(dados, where, transacao = {}) {
        const resultDados = await this._validaMes(new Date(dados.data), dados.descricao);
        if (resultDados === null || resultDados.length === 0) {
            const result = await database[this.nomeModelo].update(dados, {where: {...where}}, transacao);
            return result.length > 0 ? await this.findOne({id: Number(where.id)}) : null;
        }
        return null;
    }

    /**
     * Exclui os dados no banco
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        return database[this.nomeModelo].destroy({where: {id: Number(id)}});
    }

    async _validaMes(data, descricao) {
        try {
            const lastDayOfMonth = new Date(data.getFullYear(), data.getMonth() + 1, 0);
            const firstDayOfMonth = new Date(data.getFullYear(), data.getMonth(), 1);

            const verificaData = await this.findAll({
                descricao: descricao,
                data: {
                    [Op.between]: [firstDayOfMonth, lastDayOfMonth]
                }
            });
            return verificaData !== null && verificaData.length > 0 ? [] : null;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = Services;
