const express = require('express');
const router = express.Router();

router.get('/api/products/:id/reviews', function(req, res){
  res.json({productId: req.params.id, reviews: true});
})
router.get('/api/products/:id', function(req, res){
  res.json({productId: req.params.id});
})
router.get('/api/products', function(req, res){  
  res.json({products: req.method});
})
router.get('/api/users', function(req, res){
  res.json({users: 'All users'});
})
router.get('/api/checkCookie', (req, res) => {
   res.json({cookie: req.parsedCookies});
})
router.get('/api/checkQuery', (req, res) => {
   res.json({parsedQuery: req.parsedQuery});
})
router.post('/api/products', (req, res) =>{  
  res.json(req.body);
})

export default router