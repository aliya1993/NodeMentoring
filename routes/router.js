const express = require('express');
const router = express.Router();

const users = {
  'username1': {
    email: "email1",
    pwd: "12"
  },
  'username2': {
    email: "email2",
    username: "username2",
    pwd: "12"
  },
}


router.get('/api/products/:id/reviews', function (req, res) {
  res.json({ productId: req.params.id, reviews: true });
})
router.get('/api/products/:id', function (req, res) {
  res.json({ productId: req.params.id });
})
router.get('/api/products', function (req, res) {
  res.json({ products: req.method });
})
router.get('/api/users', function (req, res) {
  res.json({ users: 'All users' });
})
router.get('/api/checkCookie', (req, res) => {
  res.json({ cookie: req.parsedCookies });
})
router.get('/api/checkQuery', (req, res) => {
  res.json({ parsedQuery: req.parsedQuery });
})
router.post('/api/products', (req, res) => {
  res.json(req.body);
})
router.post('/auth', (req, res) => {
  let user = req.body;
  //let user = JSON.stringify(request);
  console.log(user);
  console.log(users[user.name]);
  if (users[user.name] && users[user.name].pwd === user.pwd) {
    res.send('You are logged in');
  }
  res.send('Wrong data');
})

export default router