const {ReceitaService} = require("../services");
const receitaService = new ReceitaService();

class ReceitaController {
    /**
     * Insere uma nova receita ou retorna uma já inserida.
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns
     */
    static async insertReceita(req, res, next) {
        try {
            const inserirRegistro = await receitaService.inserirDados(req.body);

            return inserirRegistro !== null
                ? res.status(201).json(inserirRegistro)
                : res.status(400).json({send: "Não é possível inserir a receita, pois dados já foram inseridos"});
        } catch (e) {
            return res.status(500).json({send: e.message});
        }
    }

    /**
     * Retorna uma lista com todas as receitas
     * @param {*} req
     * @param {*} res
     * @returns
     */
    static async getDados(req, res) {
        try {
            const all = await receitaService.getDados();

            return res.status(200).json(all);
        } catch (e) {
            return res.status(500).json({send: e.message});
        }
    }

    /**
     * Pega os dados dado seu ID
     * @param {*} req
     * @param {*} res
     * @returns
     */
    static async getDadosById(req, res) {
        try {
            const {id} = req.params;
            if (Number(id) === 0) {
                return res.status(400).json({send: 'Informe um ID válido!'});
            }

            const receita = await receitaService.getBydId(Number(id));

            return receita === null ? res.status(204).json() : res.status(200).json(receita);
        } catch (e) {
            return res.status(500).json({send: e.message});
        }
    }

    /**
     * Atualiza a receita
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async updateReceita(req, res) {
        try {
            const {id} = req.params;
            if (Number(id) === 0) {
                return res.status(400).json({send: 'Informe um ID válido!'});
            }

            const receitaAtualizada = await receitaService.updateReceita(Number(id), req.body);
            console.log(receitaAtualizada)

            return receitaAtualizada === null ? res.status(400).json({send: "Não foi possível atualizar a receita."}) : res.status(200).json(receitaAtualizada);
        } catch (e) {
            return res.status(500).json({send: e.message});
        }
    }

    /**
     * Exclui a receita
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    static async deleteReceita(req, res) {
        try {
            const {id} = req.params;
            if (Number(id) === 0) {
                return res.status(400).json({send: 'Informe um ID válido!'});
            }

            const receita = await receitaService.deleteReceita(Number(id));

            return receita === null ? res.status(400).json({send : "Não é possível excluir a receita."}) : res.status(200).json(receita);
        } catch (e) {
            return res.status(500).json({send: e.message});
        }
    }
}

module.exports = ReceitaController;
