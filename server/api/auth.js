const express = require('express');
const app = express.Router();
const { isLoggedIn } = require('./middleware');
const { authenticate, createUser, updateUser, updateAddress, resetPassword } = require('../db');

app.post('/login', async (req, res, next) => {
  try {
    const token = await authenticate(req.body, process.env.JWT_SECRET); // Pass the secret key here
    res.send({ token });
  } catch (ex) {
    next(ex);
  }
});

// POST /users/register route handler
app.post('/users/register', async (req, res, next) => {
  try {
    const response = await createUser(req.body);
    res.send(response);
  } catch (ex) {
    next(ex);
  }
});

// GET /me route handler
app.get('/me', isLoggedIn, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});

// PUT /users/:id route handler
app.put('/users/:id', isLoggedIn, async(req, res, next) => {
  try {
    res.send(await updateUser({...req.body, id: req.params.id}));
  } catch (ex) {
    next(ex);
  }
});

// PUT /users/:id/address route handler
app.put('/users/:id/address', isLoggedIn, async(req, res, next) => {
  try {
    res.send(await updateAddress({...req.body, id: req.params.id}));
  } catch (ex) {
    next(ex);
  }
});

// PATCH /users/:id/password route handler
app.patch('/users/:id/password',isLoggedIn,async(req,res,next)=>{
  try{
    res.send(await resetPassword({...req.body,id:req.params.id}));
  } catch (ex) {
    next(ex);
  }
});

module.exports = app;
