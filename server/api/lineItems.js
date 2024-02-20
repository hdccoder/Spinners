const express = require('express');
const app = express.Router();
const { isLoggedIn } = require('./middleware');
const { fetchLineItems, createLineItem, updateLineItem, deleteLineItem } = require('../db');

app.get('/', isLoggedIn, async (req, res, next) => {
  try {
    // Fetch line items for the user, including preorders
    const lineItems = await fetchLineItems(req.user.id);
    res.send(lineItems);
  } catch (ex) {
    next(ex);
  }
});

app.post('/', isLoggedIn, async (req, res, next) => {
  try {
    // TODO: Ensure the order's user_id is req.user.id
    // Create a new line item
    const newLineItem = await createLineItem(req.body);
    res.send(newLineItem);
  } catch (ex) {
    next(ex);
  }
});

app.put('/:id', isLoggedIn, async (req, res, next) => {
  try {
    // TODO: Ensure the order's user_id is req.user.id
    // Update a line item
    const updatedLineItem = await updateLineItem({ ...req.body, id: req.params.id });
    res.send(updatedLineItem);
  } catch (ex) {
    next(ex);
  }
});

app.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    // TODO: Ensure the order's user_id is req.user.id
    // Delete a line item
    await deleteLineItem({ id: req.params.id });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;