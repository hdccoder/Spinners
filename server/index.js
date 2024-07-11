require('dotenv').config(); // Load environment variables from .env file
const jwtSecretKey = process.env.JWT; // Get JWT secret key from environment variable

const crypto = require('crypto');
const express = require('express');
const app = express();
const path = require('path');

// Check if JWT secret key is defined
if (!jwtSecretKey) {
  console.error("JWT secret key is not defined in the environment variables.");
  process.exit(1); // Terminate the application if JWT secret key is missing
} else {
  console.log("JWT secret key loaded from environment variables.");
}

// Use the provided JWT secret key or generate a random one if not provided
const secretKey = jwtSecretKey || crypto.randomBytes(32).toString('hex');
console.log('Secret Key:', secretKey);

// Your existing code continues here
const { seed, client } = require('./db');

app.use(express.json({ limit: "200mb" }));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/api', require('./api'));

const init = async () => {
  try {
    await client.connect();
    console.log('Connected to database');
    await seed();
    console.log('Created tables and seeded data');

    const port = process.env.PORT || 3010;
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error during initialization', error);
    process.exit(1); // Terminate the application if initialization fails
  }
};

init();