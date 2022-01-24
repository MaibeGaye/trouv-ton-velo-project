const User = require('../models/user');
// const cache = require('../services/cache');


module.exports = {
    findAll: async (_, response) => {
        console.log('Data depuis Postgres');
        const posts = await User.findAll();
        console.log('Appel de response.json');
        response.json(posts);
    },
    findOne: async (_, response) => {
      const posts = await User.findOne(0);
      response.json(posts);
  },


}
