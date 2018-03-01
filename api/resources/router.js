import express from 'express'
import {booksRouter} from './books/books.router'
import {genresRouter} from './genres/genres.router'


export const apiRouter = express.Router()

/** Mounts nested routers routes */
apiRouter.use('/books', booksRouter)
apiRouter.use('/genres', genresRouter)
