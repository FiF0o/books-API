/**
 * Created by jonlazarini on 12/02/17.
 */
//TODO once sub routes index.js is define, change routes to not show the root e.g. /books
var express = require('express')
var router = express.Router()
var url = require('url')

var Books = require('../controllers/books')

router.get('/books', function(req, res, next) {
    // callback passed down in controller
    Books.getBooks(function(err, books) {
        if (err) throw err
        res.json(books)
    }, undefined)
})

router.get('/books/:_id', function(req, res, next) {
    var bookId = req.params._id
    Books.getBookById(bookId, function(err, book) {
        if (err) throw err
        res.json(book)
    }, undefined)
})

router.post('/books', function(req, res, next) {
    // grabs the req from the POST
    var bookReq = req.body
    Books.addBook(bookReq, function(err, book) {
        if(err) throw err
        res.json(book)
    })
})

//update item
router.put('/books/:_id', function(req, res, next) {
    // retrieves query string params and parse them for DB update
    var queryStringParsed = url.parse(req.url, true).query;
    var id = req.params._id
    var options = {new: true}

    console.log(queryStringParsed)

    Books.updateBook(id, queryStringParsed, {}, function(err, updatedBook) {
        if(err) throw err
        res.json(updatedBook)
    })
})

router.delete('/books/:_id', function(req, res, next) {
    var _id = req.params._id
    Books.deleteBook(_id, function(err, book) {
        res.json(book)
    })
})


module.exports = router