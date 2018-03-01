import express from 'express'
import {apiRouter} from './resources/router'


const app = express()


/** Global Middlewares */


/** DB */


/** Mount routers to the app */
app.use('/api', apiRouter)

app.get('/', (req, res, next) => {
  res.json({ok: true})
})

export default app