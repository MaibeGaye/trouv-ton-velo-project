const jwt = require('../services/jwt');

module.exports = (request, response, next) => {
    try {
        let token = request.headers['authorization'];
        console.log(token);
        if (!token) {
            return response.status(401).json('Invalid token');
        }
        const payload = jwt.validateToken(token);
        console.log(payload);
        if (!payload.data){
            return response.status(401).json('Invalid token');
        }
        request.userId = payload.data;
        next();
    } catch (error) {
        response.status(401).json(error.message);
    }
}