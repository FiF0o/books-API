import http, {createServer} from 'http';

import app from './server'


/** Wrap express app into http to use the http interface (events, or ws, etc..) */
const server = http.createServer(app)

server.listen(3000, () => {
  console.log('API on port 3000')
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