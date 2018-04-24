function books(parent, args, context, info) {
  // carrying linkId from the previous resolver getBooks() that was returned
  return context.db.query.books({ where: { id_in: parent.linkIds } }, info)
}

module.exports = {
  books,
}
