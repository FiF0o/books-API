/**
 * Created by jonlazarini on 11/02/17.
 */
var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
// var mongoose = require('mongoose')

// var genres = require('../routes/genres')

var PORT = process.env.PORT || 3001
var app = express()

app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    var locals = res.locals
    res.send(locals)
})

// app.use('/genres', genres)

app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404;
    // send payload error to the next middleware
    next(err)
})

/**
 * middleware gets the error and check whether this is a 404
 * err is passed as the first argument as the previous MW returns the err
 */
app.use(function(err, req, res, next) {
    // create locals obj to send back the page - will be avail from global scope
    res.locals.message = err.message
    // returns the error if 404 otherwise default to 500 below
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('../views/error.jade')
})

app.listen(PORT, function() {
    console.log('API listening on PORT', PORT)
})

module.exports = app