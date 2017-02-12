/**
 * Created by jonlazarini on 12/02/17.
 */
var Books = require('../models/Books')

module.exports.getBooks = function(cb, limit) {
    Books.find(cb).limit(limit)
}

module.exports.getBookById = function(id, cb) {
    Books.findById(id, cb)
}

module.exports.addBook = function(newBook, cb) {
    // POST req must have Books model as req.headers when posting new book
    Books.create(newBook, cb)
}

module.exports.updateBook = function(id, bookToUpdate, options, cb) {
    // query to find the item in the mongo col
    var dbQuery = {_id: id}
    var update = {
        // assign new name to the existing name in the col - Genre model has one field
        title: bookToUpdate.title,
        author: bookToUpdate.author,
        genre: bookToUpdate.genre,
        description: bookToUpdate.description,
        link_img: bookToUpdate.link_img,
        link_buy: bookToUpdate.link_buy
    }

    Books.findOneAndUpdate(dbQuery, update, options, cb)
}

module.exports.deleteBook = function(id, cb) {
    var query = {_id: id}
    Books.remove(query, cb)
}