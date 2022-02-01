const Router = require("express");
const router = Router();
const DespesaController = require('../controllers/DespesaController');

router.get('/api/despesa').get('/api/despesa/:id');
router.post('/api/despesa');
router.put('/api/despesa/:id');
router.delete('/api/despesa/:id');

module.exports = router;