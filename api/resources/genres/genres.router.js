import express from 'express'
import genresController from './genres.controller'

export const genresRouter = express.Router()


genresRouter.param('id', genresController.findByParam)

/** Routes definitions */
genresRouter.route('/')
  .get(genresController.getAll)
  .post(genresController.createOne)

genresRouter.route('/:id')
  .get(genresController.getOne)
  .put(genresController.updateOne)
  .delete(genresController.deleteOne)
