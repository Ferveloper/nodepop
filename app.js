'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const db = require('./lib/connectMongoose');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/apiv1/listings');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV !== 'test') app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'public')));

//i18n setup
const i18n = require('./lib/i18nConfigure')();
app.use(i18n.init);

//Routes
app.use('/', indexRouter); //Website route
app.use('/apiv1', apiRouter); //API route
app.use('/change-lang', require('./routes/change-lang'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  // render the error JSON
  if (isAPIRequest(req)) {
    res.json({
      success: false,
      error: err.message
    });
    return;
  }

  // render the error page
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.render('error');
});

function isAPIRequest(req) {
  return req.originalUrl.indexOf('/apiv1') === 0;
};

module.exports = app;