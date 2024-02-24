const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchContacts = async () => {
  const SQL = `
    SELECT *
    FROM contacts
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const createContact = async (contact) => {
  const SQL = `
    INSERT INTO contacts (id, name, email, message) 
    VALUES($1, $2, $3, $4) RETURNING *
  `;
  const response = await client.query(SQL, [
    uuidv4(),
    contact.name,
    contact.email,
    contact.message
  ]);
  return response.rows[0];
};

module.exports = {
  fetchContacts,
  createContact
};