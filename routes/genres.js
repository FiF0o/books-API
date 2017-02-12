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

router.post('/genres', function(req, res, next) {
    /**
     *
     * body parser reads the request
     * must return a "name" key in the req.body to match genre model
     * {"name":"new genre"}
     *
     * **/
    var genre = req.body
    console.log(genre)
    Genres.addGenre(genre, function(err, addedGenre) {
        if (err) throw err
        res.json(addedGenre)
    })
})

module.exports = router