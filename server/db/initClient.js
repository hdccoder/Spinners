const pg = require('pg');

// Initialize the client asynchronously
const initClient = async () => {
  const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/Spinners_db');
  await client.connect(); // Wait for the client to connect
  console.log('Connected to the database');
  return client;
};

// Example middleware for verifying JWT tokens
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';

const verifyTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      // Handle token verification failure
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// Export the client and middleware
module.exports = {
  initClient,
  verifyTokenMiddleware
};