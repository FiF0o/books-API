import express from 'express'
// Import controllers here

export const genresRouter = express.Router()


// genresRouter.param('id', genresController.findByParam)


/** Routes definitions */
genresRouter.route('/')
  // inject controllers
  .get((req, res, next) => {
    res.json({genres: "ok"})
  })