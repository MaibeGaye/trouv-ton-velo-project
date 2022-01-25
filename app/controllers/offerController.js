const Offer = require('../models/offer');
// const cache = require('../services/cache');


module.exports = {
    findAll: async (_, response) => {
        const offers = await Offer.findAll();
        response.json(offers);
    },

    findOne: async (request, response) => {
        const id = parseInt(request.params.id, 10);
        const offer = await Offer.findOne(id);
        response.json(offer);
    }


}
