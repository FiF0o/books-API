import express from 'express'
import booksController from './books.controller'

export const booksRouter = express.Router()


booksRouter.param('id', booksController.findByParam)

/** Routes definitions */
booksRouter.route('/')
  .get(booksController.getAll)
  // curl -X POST -d title=zzzzzzzzz -d author=toto -d favorite=false http://localhost:3000/api/books/
  .post(booksController.createOne)

booksRouter.route('/:id')
  // curl http://localhost:3000/api/books/<id>
  .get(booksController.getOne)
  // curl -X PUT -d title=zgegouz localhost:3000/api/books/<id>
  .put(booksController.updateOne)
  // curl -X DELETE  http://localhost:3000/api/books/<id>
  .delete(booksController.deleteOne)