import express from 'express'
// Import controllers here

export const booksRouter = express.Router()


// booksRouter.param('id', booksController.findByParam)


/** Routes definitions */
booksRouter.route('/')
  // inject controllers
  .get((req, res, next) => {
    res.json({books: "ok"})
  })