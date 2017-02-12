/**
 * Created by jonlazarini on 11/02/17.
 */
var mongoose = require('mongoose')

var genreSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
})

var Genres = mongoose.model('Genres', genreSchema)

module.exports = Genres