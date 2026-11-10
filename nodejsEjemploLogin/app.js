const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const restrictedRouter = require('./routes/restricted');

let app = express();
app.locals.title_global = "Nuestra Web";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'La frase que nos de la gana',
  resave: false,
  saveUninitialized: true
}));
app.use((req, res, next) => {
  if (req.session.message){
    res.locals.message = req.session.message;
  } else {
    res.locals.message = "";
  }
  if (req.session.error){
    res.locals.error = req.session.error;
  } else {
    res.locals.error = "";
  }
  delete req.session.message;
  delete req.session.error;
  next();
});

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/restricted', checkLogin, restrictedRouter);
app.use('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

function checkLogin(req, res, next){
  console.log(req.session);
  if (req.session.user){
    next();
  }
  res.redirect('/');
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
