const {DespesaService} = require("../services");
const despesaService = new DespesaService();

class DespesaController {
    static async insert(req, res) {
        try {
            const inserirDespesa = await despesaService.criar(req.body);
            return inserirDespesa !== null
                ? res.status(201).json(inserirDespesa)
                : res.status(400).json({send: "Não é possível inserir a despesa, pois dados já foram inseridos"});
        }
        catch (e) {
            return res.status(500).json({send: e.message});
        }
    }

    static async get(req, res) {
        try {
            const all = await despesaService.findAll();
            return all.length > 0 ? res.status(200).json(all) : res.status(204).json();
        }
        catch (e) {
            return res.status(500).json({send: e.message});
        }
    }

    static async getById(req, res) {
        try {
            const {id} = req.params;
            if (Number(id) === 0) {
                return res.status(400).json({send: 'Informe um ID válido!'});
            }

            const despesa = await despesaService.findOne({id: Number(id)});
            return despesa === null ? res.status(204).json() : res.status(200).json(despesa);
        }
        catch (e) {
            throw e;
        }
    }

    static async update(req, res) {
        try {
            const {id} = req.params;
            if (Number(id) === 0) {
                return res.status(400).json({send: 'Informe um ID válido!'});
            }

            const despesaAtualizada = await despesaService.update(req.body, {id: Number(id)});
            return despesaAtualizada === null
                ? res.status(400).json({send: "Não foi possível atualizar a despesa."})
                : res.status(200).json(despesaAtualizada);
        }
        catch (e) {
            throw e;
        }
    }

    static async delete(req, res) {
        try {
            const {id} = req.params;
            if (Number(id) === 0) {
                return res.status(400).json({send: 'Informe um ID válido!'});
            }

            const despesa = await despesaService.delete(Number(id));
            return despesa === null
                ? res.status(400).json({send: "Não é possível excluir a despesa."})
                : res.status(200).json({send: "Despesa excluida!"});
        }
        catch (e) {
            return res.status(500).json({send: e.message});
        }
    }
}

module.exports = DespesaController;
