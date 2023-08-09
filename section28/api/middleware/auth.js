const jwt = require('jsonwebtoken');

const getSecret = require('../util/get-secret');
const JWT_SECRET = getSecret('jwt');

module.exports = (req, res, next) => {
    let authHeader = req.get('Authorization');
    let decoded;
    try {
        if (!authHeader) {
            req.isAuth = false;
            return next();
        }
        
        token = authHeader.split(' ')[1];
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        req.isAuth = false;
        return next();
    }

    if (!decoded) {
        req.isAuth = false;
        return next();
    }

    req.userId = decoded.userId;
    req.isAuth = true;
    next();
}