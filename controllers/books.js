/**
 * Created by jonlazarini on 12/02/17.
 */
var Books = require('../models/Books')

module.exports.getBooks = function(cb, limit) {
    Books.find(cb).limit(limit)
}