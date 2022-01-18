const Joi = require('joi');

module.exports = Joi.object({
    descricao : Joi.string().alphanum().min(3).required(),
    valor: Joi.number().required(),
    data: Joi.date().required()
});