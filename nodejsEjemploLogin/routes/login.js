const express = require('express');
const router = express.Router();
const database = require('../database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
  const username = req.body.user;
  const password = req.body.pass;
  if (database.users.isLoginRight(username, password)){
    req.session.user = {username};
    res.redirect('restricted');
  } else {
    res.redirect('login');
  }
});

module.exports = router;
