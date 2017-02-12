/**
 * Created by jonlazarini on 12/02/17.
 */
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

module.exports = router