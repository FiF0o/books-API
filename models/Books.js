/**
 * Created by jonlazarini on 12/02/17.
 */
var mongoose = require('mongoose')

var bookSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    publisher:{
        type: String
    },
    description:{
        type: String
    },
    link_buy: {
        type: String
    },
    link_url: {
        type: String
    },
    create_date:{
        type: Date,
        default: Date.now
    }
})

var Books = mongoose.model('Books', bookSchema)

module.exports = Books