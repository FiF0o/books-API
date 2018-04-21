const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {APP_SECRET} = require('../utils')


function postBook (root, args, context, info) {
  return context.db.mutation.createBook({
    data: {
      author: args.author,
      title: args.title,
      description: args.description,
      favorite: args.favorite
    }
  }, info)
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  // Uses Prisma binding instance to store new User in db
  const user = await context.db.mutation.createUser({
    data: { ...args, password },
  }, `{ id }`)
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}


module.exports = {
  postBook,
  signup
}
