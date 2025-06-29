const jwt = require('jsonwebtoken');

const generateToken = (userData) => {
    const id = userData._id;
    return jwt.sign({ userId: id, isVerified: userData.isVerified }, '12345', { expiresIn: '90d' })
}

const jwtAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, '12345');
        
        req.user = {
            id: decoded.userId, 
            isVerified: decoded.isVerified
        };
        
        next();
    } catch (error) {
        res.status(500).json({ error: "Authentication failed" });
    }
};

module.exports = { generateToken, jwtAuthMiddleware };