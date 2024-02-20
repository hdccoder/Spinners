const express = require('express');
const app = express.Router();
const { isLoggedIn } = require('./middleware');
const { fetchOrders, updateOrder } = require('../db');

app.put('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const orderId = req.params.id;
    // Fetch the order to ensure it belongs to the current user
    const orders = await fetchOrders(req.user.id);
    const orderToUpdate = orders.find(order => order.id === orderId);

    if (!orderToUpdate) {
      const error = new Error('Order not found or does not belong to the user');
      error.status = 404;
      throw error;
    }

    // Update the order
    const updatedOrder = await updateOrder({ ...req.body, id: orderId });
    res.send(updatedOrder);
  } catch (ex) {
    next(ex);
  }
});

app.get('/', isLoggedIn, async (req, res, next) => {
  try {
    res.send(await fetchOrders(req.user.id));
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;