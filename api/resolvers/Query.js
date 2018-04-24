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
  const queriedBooks = await context.db.query
    .books({
      where,
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy
    }, `{id}`)

    const countSelectionSet = `
      {
        aggregate {
          count
        }
      }
    `
    const booksConnection = await context.db.query
      .booksConnection({}, countSelectionSet)

    // passed down to BookFeed.js in the resolution chain
    return {
      count: booksConnection.aggregate.count,
      bookIds: queriedBooks.map(link => link.id),
    }

}

async function getUsers(root, args, context, info) {
  return await context.db.query.users({}, info)
}

module.exports = {
  getBooks,
  getUsers
}