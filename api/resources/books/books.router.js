import express from 'express'
// Import controllers here

export const booksRouter = express.Router()


// booksRouter.param('id', booksController.findByParam)


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