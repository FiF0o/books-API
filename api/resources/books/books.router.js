import express from 'express'
import booksController from './books.controller'

export const booksRouter = express.Router()


booksRouter.param('id', booksController.findByParam)

/** Routes definitions */
booksRouter.route('/')
.get(
  // debug api middleware
  (req, res, next) => {
    // console.log('books MW fired')
    
    // debug apiErrorHandling
    // throw new Error('b00m! 🧐')
    next()
  },
  // inject controllers
    (req, res, next) =>
      res.json({books: "ok"})
  )

// curl http://localhost:3000/api/books/1
booksRouter.route('/:id')
  .get(booksController.getOne)