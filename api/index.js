// https://github.com/graphcool/graphql-yoga
const { GraphQLServer } = require('graphql-yoga')

import app from './server'

import config from '../config'

// Root fields & Schema definition
// TODO - Move into a separate file
const typeDefs = `
type Query {
  info: String!
  getBooks: [Book!]!
}

type Mutation {
  postBook(url: String!, description: String!): Book!
}

type Book {
  id: ID!
  description: String!
  url: String
}
`

// mocking DB - store books at runtime
let books = [{
  id: `book-0`,
  url: 'www.howtographql.com',
  description: 'description example'
}]
let idCount = books.length


// 2 - Resolvers named after the corresponding field definitions/typeDefs - Schema definition
// TODO - Move into a separate file
const resolvers = {
  /** QUERIES */
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    getBooks: () => books,
  },

  // implied graphQL resolvers for Book - not needed, demo purpose
  Book: {
    id: (root) => root.id,
    url: (root) => root.url,
    description: (root) => root.description
  },

  /** MUTATIONS */
  Mutation: {
    postBook: (root, args) => {
      const newBook = {
        id: `book-${idCount++}`,
        description: args.description,
        url: args.url
      }
      books.push(newBook)

      return newBook
    }
  }
}


const graphQLServer = new GraphQLServer({
  typeDefs,
  resolvers,
})


const options = {
  port: config.port,
  //TODO - Mount routes
  endpoint: '/api',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

graphQLServer.start(options, ({port}) => console.log(`starting on PORT ${config.port}`))

let currentApp = app

/**
 * Dev env only
 * From webpack - respond to hot reloading
 * switch to webpack later instead of nodemon in case we need to persist the app state
 * or caches, and chunk/changes when recompiling
 */
if(module.hot) {
  module.hot.accept(['./server'], () => {
    server.removeListener('request', currentApp)
    server.on('request', app)
    currentApp = app
  })
}