var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./model/db');
var model = require('./database/model');

var routes = require('./routes/index');
var users = require('./routes/users');
var orders = require('./routes/orders');
var categories= require('./routes/categories');
var products= require('./routes/products');
var employees= require('./routes/employees');
var customers= require('./routes/customers');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//var oneDay = 86400000;
//
////app.use(express.compress());
//
//app.use('/',express.static(__dirname + '/public', { maxAge: oneDay }));


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//app.use('/users', users);
////app.use('/temp', routes);
app.use('/model/orders',orders);
app.use('/model/categories', categories);
app.use('/model/products', products);
app.use('/model/employees', employees);
app.use('/model/customers', customers);
app.use('/categories', categories);
app.use('/', routes);
//app.use('/addOrder',routes);
//app.use('/addO',routes);
//app.use('/cust',routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    //res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
