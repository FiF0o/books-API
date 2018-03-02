import express from 'express'
import booksController from './books.controller'

export const booksRouter = express.Router()


booksRouter.param('id', booksController.findByParam)

/** Routes definitions */
// curl -X POST -d id=fileid http://localhost:3000/api/books/
booksRouter.route('/')
  .get(booksController.getAll)
  .post(booksController.createOne)

// curl http://localhost:3000/api/books/1
booksRouter.route('/:id')
  .get(booksController.getOne)
  .put(booksController.updateOne)
  .delete(booksController.deleteOne)