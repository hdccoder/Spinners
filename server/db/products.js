const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchProducts = async()=> {
  const SQL = `
    SELECT *
    FROM products
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const createProduct = async(product)=> {
  const SQL = `
    INSERT INTO products (id, name, price, title, image) VALUES($1, $2, $3, $4, $5) RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), product.name, product.price, product.title, product.image]);
  return response.rows[0];
};

const updateProduct = async(product) => {
  const SQL = `
    UPDATE products
    SET name = $1, price = $2, title = $3, image= $4
    WHERE id = $5
    RETURNING *
  `
  const response = await client.query(SQL, [product.name, product. price, product.title, product.image, product.id])
  return response.rows[0]
}

module.exports = {
  fetchProducts,
  createProduct,
  updateProduct
};
