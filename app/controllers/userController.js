const User = require('../models/user');
const jwt = require('../services/jwt');
// const cache = require('../services/cache');


module.exports = {
    findAll: async (_, response) => {
        console.log('Data depuis Postgres');
        const users = await User.findAll();
        console.log('Appel de response.json');
        response.json(users);
    },
    findOne: async (_, response) => {
        const id = parseInt(request.params.id, 10);
        const user = await User.findOne(id);
        response.json(user);
    },

    handleSignup: async (request, response) => {
        try {
            const user = await new User(request.body).save();
            const token = jwt.makeToken(user);
            response.setHeader('Authorization', token)
            response.setHeader('Access-Control-Expose-Headers', 'Authorization')
            response.status(201).json(user);
        } catch(error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
    handleLogin: async (request, response) => {
        try {
            const user = await new User(request.body).getByEmail();
            const token = jwt.makeToken(user);
            response.setHeader('Authorization', token)
            response.setHeader('Access-Control-Expose-Headers', 'Authorization')
            response.status(200).json(user);
        } catch(error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },
    getInfos: (request, response) => {
        try {
            const infos = {
                message: 'Après vérif d\'où vient la requête'
            };
            // console.log(request.userId);
            response.setHeader('Authorization', jwt.makeToken(request.userId));
            response.setHeader('Access-Control-Expose-Headers', 'Authorization')
            response.status(200).json(infos);
        } catch(error) {
            console.log(error);
            response.status(500).json(error.message);
        } 
    }

}
