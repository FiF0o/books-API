function getBooks(root, args, context, info) {
  return context.db.query.books({}, info)
}

const info = () => `Hello!`

module.exports = {
  getBooks,
  info
}