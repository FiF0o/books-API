async function getBooks(root, args, context, info) {
  // constructing the filtered query for filter Prisma binding converted into GraphQL mutation
  const where = args.filter ?
    {
      OR: [
        { author_contains: args.filter },
        { title_contains: args.filter },
        { description_contains: args.filter }
      ]
    }
    :
    {}
  // query ($filter: String) { books(where:{...}) }
  return await context.db.query
    .books({
      where,
      skip: args.skip,
      first: args.first
    }, info)
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