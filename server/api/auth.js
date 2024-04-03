const {
  authenticate,
  findUserByToken,
  createUser,
  updateUser,
  resetPassword,
} = require('../db');
const express = require('express');
const app = express.Router();
const { isLoggedIn } = require('./middleware');

app.post('/login', async (req, res, next) => {
  try {
    const token = await authenticate(req.body);
    res.send({ token });
  } catch (ex) {
    next(ex);
  }
});
app.post('/users/register', async (req, res, next) => {
  try {
    const response = await createUser(req.body);
    res.send(response);
  } catch (ex) {
    next(ex);
  }
});
app.get('/me', isLoggedIn, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});
//update user db
app.put('/users/:id', isLoggedIn, async(req, res, next) => {
  try {
      res.send(await updateUser({...req.body, id: req.params.id}));
  } catch (ex) {
    next(ex);
  }

})

//update customers address in db
app.put('/users/:id/address', isLoggedIn, async(req, res, next) => {
  try {
    res.send(await updateAddress({...req.body, id: req.params.id}));
} catch (ex) {
  next(ex);
}
})

app.patch('/users/:id/password',isLoggedIn,async(req,res,next)=>{
try{
 res.send(await resetPassword({...req.body,id:req.params.id}));
}catch (ex) {
  next(ex);
}
})

module.exports = app;
