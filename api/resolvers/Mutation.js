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


module.exports = {
  postBook
}