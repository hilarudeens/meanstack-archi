'use strict';
var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var catalog = require('./modules/catalog');
var pdfdownload = require('./modules/pdfdownload');


var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'server_web', 'app')));
app.use(function (req, res, next) {
    if (req.url.indexOf('/api') === -1) {
        // var token = req.url === '/' ? 'index.html': req.url;
        var token = req.url;
        // Sending static files to browser
        var path = path.join(__dirname, '..', 'server_web', 'app', token);
        if (!fs.existSync(path)) {
            var err = new Error('Not Found');
            err.status = 404;
            return next(err);
        }
        return res.sendFile(path);
    }
    next();
});

// ROUTES
app.use('/api/catalog', catalog.routes);
app.use('/api/pdfdownload', pdfdownload.routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
