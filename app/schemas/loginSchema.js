const Joi = require('joi');

const schema = Joi.object({
    email: Joi.string().email().max(64).required(),
    password : Joi.string().min(8).max(64).required()
});

module.exports = schema;

