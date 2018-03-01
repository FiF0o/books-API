export const apiErrorMiddleware = (error, req, res, next) => {
  console.error(error.stack)
  res.status(500).send(error.message || error.toString())
}