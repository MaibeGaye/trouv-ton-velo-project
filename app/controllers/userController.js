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
        const user = await User.getByEmail(request.body.email);
        try {
          if (!user) { // if (user === undefined || user === null || user === 0 || user ===false || user === '')
            //on n'a trouvé aucun user enregistré avec cet email
            //on affiche une erreur et les champs saisis
            return console.log('email inconnu');
        }
        //si oui
        //on va checker que le mot de passe en clair dans le formulaire matche avec la version chiffrée stockée en BDD
        const isPwdValid = await bcrypt.compare(request.body.password, user.password)
        //si ça matche pas, on engueule l'utilisateur en lui disant de vérifier sa saisie
        if (isPwdValid === false) { // if (user === undefined || user === null || user === 0 || user ===false || user === '')
            //on n'a trouvé aucun user enregistré avec cet email
            return console.log('email ok mais mdp incorrect');
        }
            user.auth = "true";
            response.status(201).json(user);
        } catch(error) {
            response.status(500).json(error.message);
        }
      }

}
