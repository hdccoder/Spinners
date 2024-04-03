const jwt = require('jsonwebtoken');
const { findUserByToken } = require('../db');

const isLoggedIn = async (req, res, next) => {
  try {
    // Extract JWT token from request headers
    const token = req.headers.authorization;

    // Verify JWT token
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      
      // Find user by token
      const user = await findUserByToken(token);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
      
      // Attach user object to request for further use
      req.user = user;
      next();
    });
  } catch (ex) {
    next(ex);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.is_admin) {
    next();
  } else {
    const error = Error('Must be admin');
    error.status = 401;
    next(error);
  }
};

module.exports = { isLoggedIn, isAdmin };
