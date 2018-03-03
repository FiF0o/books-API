import express from 'express'
import booksRouter from './books'
import genresRouter from './genres'


export const apiRouter = express.Router()

/** Mounts nested routers routes */
apiRouter.use('/books', booksRouter)
apiRouter.use('/genres', genresRouter)
