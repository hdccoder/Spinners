const { response } = require('express');
const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchWishlistItems = async (userId) => {
    const SQL = `
        SELECT *
        FROM wishlist
        WHERE user_id = $1;
    `;
    const response = await client.query(SQL, [userId]);
    return response.rows;
};

const createWishlistItem = async (wishlistItem) => {
    const SQL = `
        INSERT INTO wishlist (user_id, product_id, id) VALUES ($1, $2, $3) RETURNING *
    `;
    const values = [wishlistItem.user_id, wishlistItem.product_id, uuidv4()];

    try {
        const response = await client.query(SQL, values);
        return response.rows[0];
    } catch (error) {
        // Check for duplicate key violation and handle accordingly
        if (error.code === '23505') {
            console.error('Duplicate key violation. Wishlist item already exists.');
            // You can choose to throw a custom error or handle it as appropriate
            throw new Error('Duplicate wishlist item');
        }
        throw error; // Rethrow other errors for further handling or logging
    }
};

const deleteWishlistItem = async (productId) => {
    const SQL = `
        DELETE FROM wishlist
        WHERE product_id = $1
        AND id = (
            SELECT id
            FROM wishlist
            WHERE product_id = $1
            LIMIT 1
        );
    `;
    await client.query(SQL, [productId]);
};

module.exports = {
    fetchWishlistItems,
    createWishlistItem,
    deleteWishlistItem,
};