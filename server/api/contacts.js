const express = require('express');
const router = express.Router();
const db = require('../db/contacts'); // Adjust the path accordingly

// GET /api/contacts - Fetch all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await db.fetchContacts();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/contacts - Create a new contact
router.post('/', async (req, res) => {
  try {
    const newContact = req.body; // Assuming you send the contact details in the request body
    const createdContact = await db.createContact(newContact);
    res.status(201).json(createdContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;