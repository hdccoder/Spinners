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
}

// Generate a random secret key if it's not provided in the environment variables
const secretKey = crypto.randomBytes(32).toString('hex') || jwtSecretKey;
console.log('Generated Secret Key:', secretKey);

// Your existing code continues here
const { seed, client } = require('./db');

app.use(express.json({limit: "200mb"}));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../public/index.html')));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/api', require('./api'));

const init = async () => {
  await client.connect();
  console.log('Connected to database');
  await seed();
  console.log('Created tables and seeded data');

  const port = process.env.PORT || 3010;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

init();