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
    req.user = decoded.userId; 
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};


const socketAuth = (socket, next) => {
  const token = socket.handshake.auth.token; // Get token from client-side auth object

  if (!token) {
    const err = new Error("Authentication error: Token not provided");
    return next(err); // Stop connection if no token is provided
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded; // Attach user info from the decoded token to the socket object

    return next(); // Call next to allow the connection
  } catch (err) {
    return next(new Error("Authentication error: Invalid token"));
  }
};

module.exports = {verifyToken,socketAuth};
