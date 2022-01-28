const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(64).required(),
    lastname: Joi.string().min(3).max(64).required(),
    firstname: Joi.string().min(3).max(64).required(),
    email: Joi.string().email().max(64).required(),
    password : Joi.string().min(5).max(64).required(),
    address: Joi.string().min(3).max(256).required(),
    zip_code: Joi.number().min(3).max(5).required()
});

module.exports = schema;
