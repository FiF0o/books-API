/**
 * Created by jonlazarini on 11/02/17.
 */
var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var mongoose = require('mongoose')
var url = require('url')


/** Routes **/
var genres = require('./routes/genres')
var books = require('./routes/books')

/** middleware functions **/
var service = require('./utils/service')


/** Get an instance of express app **/
var PORT = process.env.PORT || 3001
var app = express()

/** connects to MongoDB locally & get an instance of the books-utils DB **/
mongoose.connect('mongodb://localhost/book-api')
var db = mongoose.connection


app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*var parseReqUrl = function(req, res, next) {
    var url_query = url.parse(req.url, true).query;
    console.log('parseReqUrl MW', url_query)
    next(url_query)
}
app.use('/arg', parseReqUrl, function(url_query, req, res, next){
    console.log('query in /arg', url_query)
    res.send('Hit the last MW')
})*/

// // parses app req params for the entire app
// app.use(function(req, res, next) {
//     var url_query = url.parse(req.url, true).query;
//     console.log('parseReqUrl MW', url_query)
//     next(url_query)
// })



/**
 * routes
 * nested routes: http://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router
 */
// service MW is injected in the route matching /api
//TODO Nest routes to have the following structure /api as the root
// app.use('/api', require('./routes/api'))
app.use('/api', service, genres)
app.use('/api', books)

/**
 * Global API Middlewares
 */
app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404;
    // send payload error to the next middleware via next() callback
    next(err)
})

/**
 * middleware gets the error and check whether this is a 404
 * err is passed as the first argument as the previous MW returns the err
 * new middleware arguments are always passed as the first argument following req, res, callback
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