const Offer = require('../models/offer');
// const cache = require('../services/cache');


module.exports = {
    findAll: async (_, response) => {
        console.log('Data depuis Postgres');
        const posts = await Offer.findAll();
        console.log('Appel de response.json');
        response.json(posts);
    }


}
