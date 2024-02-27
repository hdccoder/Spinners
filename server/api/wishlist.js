const express = require('express');
const app = express.Router();
const { createWishlistItem, fetchWishlistItems, deleteWishlistItem } = require('../db');
const { isLoggedIn } = require('./middleware');

// A logged in user can view their wishlist
app.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const wishlistItems = await fetchWishlistItems(req.user.id);
    res.json(wishlistItems);
  } catch (ex) {
    next(ex);
  }
});

// A logged in user can add an item to their wishlist
app.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const { user } = req;
    const wishlistItem = { ...req.body, user_id: user.id }; // Attach user_id to the wishlistItem
    const createdWishlistItem = await createWishlistItem(wishlistItem);
    res.status(201).json(createdWishlistItem);
  } catch (ex) {
    next(ex);
  }
});

// A logged in user can remove an item from their wishlist
app.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    await deleteWishlistItem(req.params.id);
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;