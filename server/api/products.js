const express = require('express');
const app = express.Router();
const { isLoggedIn, isAdmin } = require('./middleware');
const { createReview, fetchReviews, fetchProducts, updateProduct } = require('../db');

app.get('/', async (req, res, next) => {
  try {
    // Fetch all products, including preorders
    const products = await fetchProducts();
    res.send(products);
  } catch (ex) {
    next(ex);
  }
});

app.get('/:id', async (req, res, next) => {
  try {
    // TODO: Implement logic to fetch a single product by ID, including reviews
    const productId = req.params.id;
    const product = await fetchProductById(productId);
    res.send(product);
  } catch (ex) {
    next(ex);
  }
});

app.put('/:id', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    // Update product information, including the genre
    const updatedProduct = await updateProduct({ id: req.params.id, ...req.body });
    res.send(updatedProduct);
  } catch (ex) {
    next(ex);
  }
});

app.get('/:id/reviews', async (req, res, next) => {
  try {
    const productId = req.params.id;
    const reviews = await fetchReviews(productId);
    res.send(reviews);
  } catch (ex) {
    next(ex);
  }
});

app.post('/:id/reviews', isLoggedIn, async (req, res, next) => {
  try {
    const reviewData = { ...req.body, product_id: req.params.id };
    const createdReview = await createReview(reviewData);
    res.send(createdReview);
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;