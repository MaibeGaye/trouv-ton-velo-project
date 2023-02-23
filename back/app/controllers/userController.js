const User = require('../models/user');
const jwt = require('../services/jwt');

module.exports = {
    findAll: async (_, response) => {
        const users = await User.findAll();
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
            deleteToken(user.id);
            const access_token = await jwt.makeToken(user);
            const refresh_token = await jwt.generateRefreshToken(user);
            console.log(`caching user.id "${user.id}" & refresh token "${refresh_token}"`);

            // on enregistre le token dans redis
            console.log('user id :');
            console.log(user.id);
            console.log('refresh_token');
            console.log(refresh_token);
            
            response.setHeader("Access-Control-Expose-Headers", [
                "Authorization",
                "RefreshToken",
            ]);
            response.setHeader("Authorization", access_token);
            response.setHeader("RefreshToken", refresh_token)

            response.status(200).json(user);
        } catch(error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },

    refreshToken: async (request, response) => {
        try {
            const ref_token = request.headers.authorization;
            if (!ref_token) {
                return response.status(401).json('No token');
            }

            const payload = jwt.validateRefreshToken(ref_token);
            if (!payload.data){
                return response.status(401).json('Invalid token payload');
            }
            //check if the token key exists in redis
            const verifiedToken = await verifyToken(payload.data.id, ref_token);
            if (!verifiedToken) {
                return response.status(401).json('No token found in db');
            }
            const access_token = await jwt.makeToken(payload.data);
            const refresh_token = ref_token;

            response.setHeader("Access-Control-Expose-Headers", [
                "Authorization",
                "RefreshToken",
            ]);
            response.setHeader("Authorization", access_token);
            response.setHeader("RefreshToken", refresh_token)

            response.status(200).json(payload.data);
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
            if (data.lendedOffers) {
                for (let i = 0; i < data.lendedOffers.length; i++){
                    data.lendedOffers[i].currentBorrowerInfos = await User.getCurrentBorrowerInfos(data.lendedOffers[i].id);
                }
            }
            data.borrowedOffers = await User.getBorrowedOffers(request.userId.id);
            if (data.borrowedOffers) {
                for (let i = 0; i < data.borrowedOffers.length; i++){
                    data.borrowedOffers[i].currentLenderInfos = await User.getCurrentLenderInfos(data.borrowedOffers[i].id);
                }
            }
            response.status(200).json(data);
        } catch(error) {
            console.log(error);
            response.status(500).json(error.message);
        } 
    },

    edit: async (request, response) => {
        try {
            request.body.id = request.userId.id;
            const offer = await new User(request.body).save();
            response.status(200).json(offer);
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);   
        }
    },

    delete: async (request, response) => {
        try {
            await User.delete(request.userId.id);
            response.status(200).json({msg: `User ${request.userId.id} deleted !`, logged:false});
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    },

    disconnect: async (request, response) => {
        try {
            deleteToken(request.userId.id);
            response.status(200).json({msg: `User ${request.userId.id} disconnected !`, logged:false});
        } catch (error) {
            console.log(error);
            response.status(500).json(error.message);
        }
    }

}
