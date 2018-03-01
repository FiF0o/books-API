import express from 'express'
import {apiRouter} from './router'
import {connect} from '../db'
import {setupMiddleware} from './middlewares'
import {apiErrorMiddleware} from './modules/apiErrorHandling'


const app = express()


/** Global Middlewares */
setupMiddleware(app)

/** DB */
connect()


/** Mount routers to the app */
app.use('/api', apiRouter)

app.get('/', (req, res, next) => {
  res.json({ok: true})
})

/** API errors handling */
app.use(apiErrorMiddleware)

export default app
