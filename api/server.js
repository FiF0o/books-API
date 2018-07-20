import express from 'express'
import cors from 'cors'


const app = express()


/** Allow api request from client */
app.use(
  cors({
    origin: `http://localhost:${process.env.APP_PORT || 3001}`,
    credentials: true
  })
)

app.get('/', (req, res, next) => {
  res.json({ok: true})
})

export default app
