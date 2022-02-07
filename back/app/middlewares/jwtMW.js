const jwt = require('../services/jwt');
const {verifyToken} = require('../services/tokenCache');

module.exports = (request, response, next) => {
    try {
        let token = request.headers['authorization'];
        if (!token) {
            return response.status(401).json('Invalid token');
        }
        const payload = jwt.validateToken(token);
        if (!payload.data){
            return response.status(401).json('Invalid token payload');
        }
        request.userId = payload.data;
        next();
    } catch (error) {
        response.status(401).json(error.message);
    }
}