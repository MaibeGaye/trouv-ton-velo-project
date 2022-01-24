const Offer = require('../models/offer');
// const cache = require('../services/cache');


module.exports = {
    findAll: async (_, response) => {
        console.log('Data depuis Postgres');
        const offers = await Offer.findAll();
        console.log('Appel de response.json');
        response.json(offers);
    },

    findOne: async (_, response) => {
        const id = parseInt(req.params.id, 10);
        const offer = await Offer.findOne(id);
        response.json(offer);
    }


}
