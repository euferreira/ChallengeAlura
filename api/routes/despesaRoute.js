const Router = require("express");
const router = Router();
const DespesaController = require('../controllers/DespesaController');

router.get('/api/despesa', DespesaController.get).get('/api/despesa/:id', DespesaController.getById);
router.post('/api/despesa', DespesaController.insert);
router.put('/api/despesa/:id', DespesaController.update);
router.delete('/api/despesa/:id', DespesaController.delete);

module.exports = router;
