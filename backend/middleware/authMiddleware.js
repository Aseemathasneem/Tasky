// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  

  if (!token) {
    console.log('No token provided.');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const bearer = token.split(' ');
  if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
    console.log('Invalid token format.');
    return res.status(401).json({ message: 'Invalid token format' });
  }

  const actualToken = bearer[1];
  

  try {
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded.userId; // Attach user id to request
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = verifyToken;
