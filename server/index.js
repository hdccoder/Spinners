require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const app = express();
app.use(express.json({limit: "200mb"}));
const path = require('path');

// Import database connection setup
const { seed, client } = require('./db');

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../public/index.html')));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use('/api', require('./api'));

const init = async()=> {
  try {
    // Connect to the database
    await client.connect();
    console.log('Connected to database');
    
    // Seed the database
    await seed();
    console.log('Created tables and seeded data');

    // Start the server
    const port = process.env.PORT || 3010;
    app.listen(port, ()=> {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
    // Handle error appropriately
  }
}

init();