const User = require('../models/user');
// const cache = require('../services/cache');


module.exports = {
    findAll: async (_, response) => {
      console.log('Data depuis Postgres');
      const users = await User.findAll();
      console.log('Appel de response.json');
      response.json(users);
    },
    findOne: async (_, response) => {
      const user = await User.findOne(1);
      response.json(user);
    },

    handleSignup: async (request, response) => {
      console.log('handleSignup');
      //on va créer une instance de User à partir des infos de request.body
      const formData = request.body;

      const user = new User(formData);

      try {
          //on appelle la méthode save de cette instance pour sauvegarder en BDD
          await user.save();

          //on répond au front avec le status qui va bien et l'instance mise à jour avec l'id créé par postgres
          response.status(201).json(user);
      } catch(error) {
          response.status(500).json(error.message);
      }
      },
    handleLogin: async (request, response) => {
      //on va créer une instance de User à partir des infos de request.body
        const user = new User(request.body);
        console.log('avant save', user);
        try {
            //on appelle la méthode save de cette instance pour sauvegarder en BDD
            await user.save();
            console.log('après save', user);
  
            //on répond au front avec le status qui va bien et l'instance mise à jour avec l'id créé par postgres
            response.status(201).json(user);
        } catch(error) {
            response.status(500).json(error.message);
        }
      }

}
