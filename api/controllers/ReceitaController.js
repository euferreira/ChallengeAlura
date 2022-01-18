const { ReceitaService } = require("../services");
const receitaService = new ReceitaService();

class ReceitaController {
  static async insertReceita(req, res, next) {
    try {
      const inserirRegistro = await receitaService.inserirDados(req.body);

      return res.status(200).json(inserirRegistro);
    } 
    catch (e) {
      return res.status(500).json({ send: e.message });
    }
  }

  static async getDados(req, res) {
    try {
      const all = await receitaService.getDados();

      return res.status(200).json(all);
    } 
    catch (e) {
      return res.status(500).json({ send: e.message });
    }
  }

  static async getDadosById(req, res) {
    try {
      const all = await receitaService.getDados();

      return res.status(200).json(all);
    } 
    catch (e) {
      return res.status(500).json({ send: e.message });
    }
  }
}

module.exports = ReceitaController;
