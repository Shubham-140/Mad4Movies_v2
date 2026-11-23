const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not set');
}

const generateToken = (userData) => {
    const id = userData._id;
    return jwt.sign({ userId: id, isVerified: userData.isVerified }, JWT_SECRET, { expiresIn: '90d' })
}

const jwtAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
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