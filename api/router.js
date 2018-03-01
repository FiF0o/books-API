import express from 'express'
import {booksRouter} from './resources/books/books.router'
import {genresRouter} from './resources/genres/genres.router'


export const apiRouter = express.Router()

/** Mounts nested routers routes */
apiRouter.use('/books', booksRouter)
apiRouter.use('/genres', genresRouter)
