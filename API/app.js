var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var register = require('./routes/register');
var login = require('./routes/login');
var logout = require('./routes/logout');
var ping = require('./routes/ping');
var error_login = require('./routes/error_login');

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// session config express & passport
app.use(require('express-session')({
  secret:'keyboard pug',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

var Accountmodels = require('./models/account');

// passport config
var Account = Accountmodels.Account;
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose setup
mongoose.connect('mongodb://mongo:27017', {useMongoClient : true});
mongoose.Promise = global.Promise;


// dynamic content
app.use('/', index);
app.use('/register',register);
app.use('/login',login);
app.use('/logout',logout);
app.use('/ping',ping);
app.use('/error_login',error_login);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pug-bootstrap/error');
});

module.exports = app;
