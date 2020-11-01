const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser'); //로그인 구현에 필요
const session = require('express-session'); //로그인 구현에 필요
const logger = require('morgan');
const passport = require('passport'); //로그인 구현에 필요
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const passportConfig = require('./passport'); //로그인 구현에 필요

var app = express();
passportConfig(passport); //로그인 구현에 필요

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET)); //로그인 구현에 필요
app.use(session({ //로그인 구현에 필요
  resave : false,
  saveUninitialized : false,
  secret : process.env.COOKIE_SECRET,
  cookie:{
    httpOnly : true,
    secure : false,
  }
}));
app.use(passport.initialize()); //로그인 구현에 필요
app.use(passport.session()); //로그인 구현에 필요

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

app.listen(app.get('port'),()=>{
  console.log(app.get('port'),"번 포트에서 대기중입니다.");
})

module.exports = app;
