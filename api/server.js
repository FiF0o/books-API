import express from 'express'
import {apiRouter} from './resources/router'
import {connect} from '../db'

const app = express()


/** Global Middlewares */


/** DB */
connect()


/** Mount routers to the app */
app.use('/api', apiRouter)

app.get('/', (req, res, next) => {
  res.json({ok: true})
})

export default app