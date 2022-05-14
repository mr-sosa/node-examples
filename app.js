const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const { connect } = require('./lib/mongo');
connect();

const productRouter = require('./modules/products/router');
const usersRouter = require('./modules/users/router');
const authRouter = require('./modules/auth/router');
const { checkToken } = require('./middlewares/jwt-validator');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front/build')));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', checkToken, productRouter);// uncomment this line and comment the next one.
//app.use('/api/products', productRouter);

app.get('*', (req, res) => {
  console.log(path.join(__dirname, 'front/build/index.html'));
  res.sendFile(path.join(__dirname, 'front/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
