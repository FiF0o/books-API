/**
 * Created by jonlazarini on 11/02/17.
 */
var Genres = require('../models/Genres')

// cb entered through the router file and passed down to the DB query with find()
module.exports.getGenres = function(cb, limit) {
    //limit is optional, can come from the parameter
    Genres.find(cb).limit(limit)
}

module.exports.addGenre = function(newGenre, cb) {
    Genres.create(newGenre, cb)
}