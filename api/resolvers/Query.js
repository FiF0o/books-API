async function getBooks(root, args, context, info) {
  return await context.db.query.books({}, info)
}

async function getUsers(root, args, context, info) {
  return await context.db.query.users({}, info)
}

const info = () => `Hello!`

module.exports = {
  getBooks,
  info,
  getUsers
}