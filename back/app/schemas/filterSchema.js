const Joi = require('joi');

const schema = Joi.object({
    zip_code: Joi.number(),
    model: Joi.string(),
    size: Joi.string(),
    lamps : Joi.boolean(),
    safety_lock : Joi.boolean(),
    helmet : Joi.boolean(),
    validity_start_date: Joi.date().iso(),
    validity_end_date: Joi.date().iso(),
});

module.exports = schema;
