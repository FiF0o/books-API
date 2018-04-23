const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {APP_SECRET, getUserId} = require('../utils')


function postBook (root, args, context, info) {
  const userId = getUserId(context)
  return context.db.mutation.createBook({
    data: {
      author: args.author,
      title: args.title,
      description: args.description,
      favorite: args.favorite,
      postedBy: { connect: {id: userId }}
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

async function login(parent, args, context, info) {
  const user = await context.db.query.user({ where: { email: args.email } }, ` { id password } `)
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}


module.exports = {
  postBook,
  signup,
  login
}
