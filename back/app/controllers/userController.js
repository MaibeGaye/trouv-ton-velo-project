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
    userDashboard: async (request, response) => {
        try {
            const data = {};
            data.userData = await User.getUserInfos(request.userId.id);
            data.lendedOffers = await User.getLendedOffers(request.userId.id);
            for (let i = 0; i < data.lendedOffers.length; i++){
                data.lendedOffers[i].currentBorrowerInfos = await User.getCurrentBorrowerInfos(request.userId.id);
            }
            data.borrowedOffers = await User.getBorrowedOffers(request.userId.id);
            response.setHeader('Authorization', jwt.makeToken(request.userId));
            response.setHeader('Access-Control-Expose-Headers', 'Authorization')
            response.status(200).json(data);
        } catch(error) {
            console.log(error);
            response.status(500).json(error.message);
        } 
    },

    edit: async (request, response) => {
        try {
            request.body.id = request.userId.id;
            response.setHeader('Authorization', jwt.makeToken(request.userId));
            response.setHeader('Access-Control-Expose-Headers', 'Authorization')
            const offer = await new User(request.body).save();
            response.status(200).json(offer);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);   
        }
    },

    delete: async (request, response) => {
        try {
            // pas besoin de renvoyer un nouveau token, on delete juste l'utilisateur connecté
            await User.delete(request.userId.id);
            response.status(200).json({msg: `L'utilisateur ${request.userId.id} a bien été supprimé !`, logged:false});
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    }

}
