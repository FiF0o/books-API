import express from 'express'
import cors from 'cors'

import apiRouter from './resources'
import {connect} from '../db'
import {setupMiddleware} from './middlewares'
import {apiErrorMiddleware} from './modules/apiErrorHandling'


const app = express()


/** Global Middlewares */
setupMiddleware(app)

/** DB */
connect()
/** Allow api request from client */
app.use(cors({origin: `http://localhost:${process.env.CLIENT_PORT || 3001}`}))


/** Mount routers to the app */
app.use('/api', apiRouter)

app.get('/', (req, res, next) => {
  res.json({ok: true})
})

/** API errors handling */
app.use(apiErrorMiddleware)

export default app
