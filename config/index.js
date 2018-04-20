require('dotenv').config()
import {merge} from 'ramda'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const env = process.env.NODE_ENV

const baseConfig = {
  port: process.env.API_PORT || 3000,
  secrets: {},
  db: {
    url: process.env.PRISMA_DB_ENDPOINT,
    secret: process.env.PRISMA_DB_SECRET
  }
}

let envConfig = {}

switch (env) {
  case 'development':
  case 'dev':
    envConfig = require('./dev').config
    break
  case 'production':
  case 'prod':
    envConfig = require('./prod').config
    break
  case 'testing':
  case 'test':
    envConfig = require('./testing').config
    break
  default:
    envConfig = require('./dev').config
}

export default merge(baseConfig, envConfig)