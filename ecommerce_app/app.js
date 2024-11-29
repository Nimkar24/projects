var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const MongoStore = require('connect-mongo'); // Import connect-mongo

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var validateUserInputRouter = require('./routes/validateUserInput');
var getProductDetailsRouter = require('./routes/getProductsDetails');
var newUserSignupRouter = require('./routes/newUserSignup');
var checkSession = require('./routes/checkIsValidSession');
var logoutUser = require('./routes/logoutuser');
var addNewProductRouter = require('./routes/addNewProductBackend');
var uploadFileRouter = require('./routes/fileUpload');
var empDetailsRouter = require("./routes/employeeDetails")

var app = express();

console.log('process ID ' + process.pid); // I comment it on 14/11/24

// Set up session middleware with MongoStore
app.use(
  session({
    secret: 'this is my secretdata to encrypt', // Secret key for session encryption
    resave: false, // Ensures the session is not saved back to the store if it's unmodified
    saveUninitialized: true, // Forces session creation if it's not already set
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/eCommerceDb', // MongoDB connection URL
      ttl: 10, // Session expiration time in seconds
    }),
    cookie: {
      maxAge: 20000, // Cookie expiration time in milliseconds (10 seconds)
      secure: false, // If true, the cookie will only be sent over HTTPS (set to true in production)
    },
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/validate/userCredentials', validateUserInputRouter);
app.use('/get/productsDetails', getProductDetailsRouter);
app.use('/new/userSignup', newUserSignupRouter);
app.use('/check/isValidSession', checkSession);
app.use('/user/logout', logoutUser);
app.use('/add/newProduct', addNewProductRouter);
app.use('/upload/file', uploadFileRouter);
app.use("/get/empDetails", empDetailsRouter);

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
