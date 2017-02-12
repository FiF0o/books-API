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

module.exports.updateGenre = function(id, genreToUpdate, options, cb) {
    // query to find the item in the mongo col
    var dbQuery = {_id: id}
    var update = {
        // assign new name to the existing name in the col - Genre model has one field
        name: genreToUpdate.name
    }
    Genres.findOneAndUpdate(dbQuery, update, options, cb)
}

module.exports.deleteGenre = function(id, cb) {
    var query = {_id: id}
    Genres.remove(query, cb)
}