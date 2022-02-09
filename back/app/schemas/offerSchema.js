const Joi = require('joi');

const schema = Joi.object({
    title: Joi.string().min(5).max(128).required(),
    infos: Joi.string().min(3).max(256).required(),
    model: Joi.string().required(),
    size: Joi.string().required(),
    helmet : Joi.boolean(),
    lamps : Joi.boolean(),
    safety_lock : Joi.boolean(), 
    photo: Joi.string().required(),
    address: Joi.string().max(256).required(),
    zip_code: Joi.number().required(),
    validity_start_date: Joi.date().iso(),
    validity_end_date: Joi.date().iso(),
    lender_id: Joi.number().integer().allow(null),
    borrower_id: Joi.number().integer().allow(null)
});

module.exports = schema;
