const jwt = require('jsonwebtoken');

const getSecret = require('../util/get-secret');
const JWT_SECRET = getSecret('jwt');

module.exports = (req, res, next) => {
    let authHeader = req.get('Authorization');
    let decoded;
    try {
        if (!authHeader) {
            const error = new Error("No authorization provided in request.");
            error.statusCode = 401;
            throw error;      
        }
        
        token = authHeader.split(' ')[1];
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    if (!decoded) {
        const error = new Error("Not authorized.");
        error.statusCode = 401;
        throw error;
    }

    req.userId = decoded.userId;
    next();
}