const express = require('express');
const router = express.Router();

const db = require('../public/javascripts/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    success: "axios get success"
  });
});

router.post('/post', function(req, res, next){
  console.log('server - recieved data from client');
  console.log(req.body);
});

module.exports = router;
