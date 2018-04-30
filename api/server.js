import express from 'express'
import cors from 'cors'

import apiRouter from './resources'
// import {connect} from '../db'
import {setupMiddleware} from './middlewares'
import {apiErrorMiddleware} from './modules/apiErrorHandling'


const app = express()


/** Global Middlewares */
setupMiddleware(app)

/** DB */
// TODO - To remove. Comment as we are switching to graphql
// connect()
/** Allow api request from client */
app.use(
  cors({
    origin: `http://localhost:${process.env.APP_PORT || 3001}`,
    credentials: true
  })
)


/** Mount routers to the app */
// app.use('/api', apiRouter)


app.get('/', (req, res, next) => {
  res.json({ok: true})
})

/** API errors handling */
app.use(apiErrorMiddleware)

export default app
