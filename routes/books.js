/**
 * Created by jonlazarini on 12/02/17.
 */
//TODO once sub routes index.js is define, change routes to not show the root e.g. /books
var express = require('express')
var router = express.Router()

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

module.exports = router