const JWT_SECRET = require('../config');
const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decode = jwt.verify(token, JWT_SECRET);
        if (decode.userId) {
            req.userId = decode.userId
            next();
        }
    }
    catch (err) {
        res.status(403).json({});
    }
}

module.exports = authMiddleware;