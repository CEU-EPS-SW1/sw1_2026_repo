const express = require('express');
const router = express.Router();
const database = require('../database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login', user: req.session.user});
});

router.post('/', async function(req, res, next) {
  const username = req.body.user;
  const password = req.body.pass;
  if (await database.users.isLoginRight(username, password)){
    req.session.user = {username};
    req.session.message = "¡Inicio de sesión correcto!";
    res.redirect('restricted');
  } else {
    req.session.error = "¡Usuario o contraseña incorrectos!";
    res.redirect('login');
  }
});

module.exports = router;
