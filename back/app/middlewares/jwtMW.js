const jwt = require('../services/jwt');

// const redis = require('redis');
// var rediscl = redis.createClient();

// rediscl.on("connect", function () {
//     console.log("Redis plugged in.");
// });
// rediscl.connect();

module.exports = (request, response, next) => {
    try {
        let token = request.headers['authorization'];
        if (!token) {
            return response.status(401).json('Invalid token');
        }
        const payload = jwt.validateToken(token);
        // console.log(payload);
        if (!payload.data){
            return response.status(401).json('Invalid token payload');
        }
        request.userId = payload.data;
        next();
    } catch (error) {
        response.status(401).json(error.message);
    }
}