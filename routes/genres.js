/**
 * Created by jonlazarini on 11/02/17.
 */
var router = require('express').Router()
// parsing req params to be passed as body
var url = require('url')

var Genres = require('../controllers/genres')

/** MW for /genres route **/
router.use('/genres', function(req, res, next) {
    console.log('///////////////')
    next()
})

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

//update item
router.put('/genres/:_id', function(req, res, next) {
    // retrieves query string params and parse them for DB update
    var queryStringParsed = url.parse(req.url, true).query;
    var id = req.params._id
    var options = {new: true}

    console.log(queryStringParsed)
    // can pass options in - required by Mongo
    Genres.updateGenre(id, queryStringParsed, {}, function(err, updatedGenre) {
        if(err) throw err
        res.json(updatedGenre)
    })
})


module.exports = router