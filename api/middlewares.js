import bodyParser from 'body-parser'

export const setupMiddleware = (app) => {
  // format QS
  app.use(bodyParser.urlencoded({extended: true}))
  // POST json - req.body
  app.use(bodyParser.json())
}