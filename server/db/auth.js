const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const findUserByToken = async(token) => {
  try {
    const payload = await jwt.verify(token, process.env.JWT);
    const SQL = `
      SELECT id, username, is_admin
      FROM users
      WHERE id = $1
    `;
    const response = await client.query(SQL, [payload.id]);
    if(!response.rows.length){
      const error = Error('bad credentials');
      error.status = 401;
      throw error;
    }

    return response.rows[0];
  }
  catch(ex){
    console.log(ex);
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
}

const authenticate = async(credentials)=> {
  const SQL = `
    SELECT id, password
    FROM users
    WHERE username = $1
  `;
  const response = await client.query(SQL, [credentials.username]);
  if(!response.rows.length){
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
  const valid = await bcrypt.compare(credentials.password, response.rows[0].password);
  if(!valid){
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }

  return jwt.sign({ id: response.rows[0].id }, process.env.JWT);
};

const updateAddress = async(user)=> {
  const SQL = `
    UPDATE users 
    SET address_line1 = $1, 
    address_line2 = $2, 
    city = $3, 
    state = $4, 
    zip_code = $5,
    phone = $6
    WHERE id = $7 
    RETURNING *
  `;
  const response = await client.query(SQL, [ user.address_line1, user.address_line2, user.city, user.state, user.zip_code, user.phone, user.user_id ]);
  return response.rows[0];
};
const createUser = async(user)=> {
  if(!user.username.trim() || !user.password.trim()){
    throw Error('must have username and password');
  }
  user.password = await bcrypt.hash(user.password, 5);
  const SQL = `
  INSERT INTO users (id, firstname, lastname, username, password, is_admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
`;
  const response = await client.query(SQL, [ uuidv4(), user.firstname, user.lastname, user.username, user.password, user.is_admin,]);
  return response.rows[0];
};

const resetPassword = async (user) => {
  user.password = await bcrypt.hash(user.password, 5)
  const SQL = `
          UPDATE users
          SET 
          password=$1
          WHERE id = $2;`;
  const response = await client.query(SQL, [user.password, user.id])
  return response.rows[0];
}


module.exports = {
  createUser,
  authenticate,
  findUserByToken,
  updateAddress,
  resetPassword,
};
