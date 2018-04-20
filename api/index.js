// https://github.com/graphcool/graphql-yoga
import { GraphQLServer } from 'graphql-yoga'
import { Prisma } from 'prisma-binding'
import { printSchema } from 'graphql'

import config from '../config'

import app from './server'

import Mutation from './resolvers/Mutation'
import Query from './resolvers/Query'

const resolvers = {
  Query,
  Mutation
}


const graphQLServer = new GraphQLServer({
  typeDefs: './api/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'api/generated/prisma.graphql',
      endpoint: `${config.db.url}`,
      secret: `${config.db.secret}`,
      debug: true,
    })
  })
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