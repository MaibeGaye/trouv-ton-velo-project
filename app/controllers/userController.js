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
        try {
            const user = await new User(request.body).save();


            // let machin = req.body - passconf
            // const user = await new User(machin).save();
            
            
            // user.passwordConfirm = "";
            response.status(201).json(user);
        } catch(error) {
            response.status(500).json(error.message);
        }
    },
    handleLogin: async (request, response) => {
        try {
            const user = await User.getByEmail(request.body.email, request.body.password);
            user.auth = "true";
            response.status(201).json(user);
        } catch(error) {
            response.status(500).json(error.message);
        }
    }

}
