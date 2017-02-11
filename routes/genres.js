/**
 * Created by jonlazarini on 11/02/17.
 */
var express = require('express')
var router = express.Router()

var Genres = require('../controllers/genres')

router.get('/genres', function(req, res, next) {
    Genres.getGenres(function(err, genres) {
        if (err) throw err
        res.json(genres)
    // optional limit
    }, undefined)
})

module.exports = router