import http from 'http';

import app from './server'
import config from '../config'

const API_PORT = config.port


/** Wrap express app into http to use the http interface (events, or ws, etc..) */
const server = http.createServer(app)

server.listen(API_PORT, () => {
  console.log(`API on port ${API_PORT}`)
})

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