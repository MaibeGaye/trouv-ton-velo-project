const User = require('../models/user');
const bcrypt = require('bcrypt');
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
      console.log(request.body.password);
      const hashedPwd = await bcrypt.hash(request.body.password, 10);
      console.log(hashedPwd);

      const newUser = new User({
        username: request.body.username,
        lastname: request.body.lastname,
        firstname: request.body.firstname,
        email: request.body.email,
        password: hashedPwd,
        address: request.body.address,
        zip_code: request.body.zip_code
      });

      try {
          //on appelle la méthode save de cette instance pour sauvegarder en BDD
          await newUser.save();

          //on répond au front avec le status qui va bien et l'instance mise à jour avec l'id créé par postgres
          response.status(201).json(newUser);
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
