import express from 'express'

const app = express()


/** Global Middlewares */


/** DB */


app.get('/', (req, res, next) => {
  res.json({ok: true})
})

export default app