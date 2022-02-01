const Router = require("express");
const router = Router();
const ReceitaController = require("../controllers/ReceitaController");
const receitaSchema = require("../schemas/receitaSchema");

/**
 * Validation da receita
 * @param req
 * @param res
 * @param next
 */
const validationMiddleware = (req, res, next) => {
    const {error} = receitaSchema.validate(req.body);
    const valid = error === null || error === undefined;

    if (valid) {
        next();
    } else {
        const {details} = error;
        const message = details.map((i) => i.message).join(",");
        res.status(422).json({error: message});
    }
};

router
    .get("/api/receita", ReceitaController.getDados)
    .get("/api/receita/:id", ReceitaController.getDadosById);
router.post("/api/receita", validationMiddleware, ReceitaController.insertReceita);
router.put('/api/receita/:id', validationMiddleware, ReceitaController.updateReceita);
router.delete('/api/receita/:id', ReceitaController.deleteReceita);

module.exports = router;
