
import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import cors from 'cors'
import { StaticRouter, matchPath } from 'react-router-dom'
import serialize from 'serialize-javascript'
import sourceMapSupport from 'source-map-support'
import reducers from '../src/reducers/'
import App from '../src/app'
import routes from '../src/routes'


if (process.env.NODE_ENV === "development") {
  sourceMapSupport.install();
}


const app = express();

app.use(express.static('public'))

app.use(cors())
app.use(handleRender)

function handleRender(req, res, next) {
  const currentRoute = routes.find(route => matchPath(req.url, route))

  let initialState = currentRoute.component.getInitialData()
  Promise.resolve(initialState)
    .then(data => {
      // throw new Error('boom!')
      const context = {data}
      const html = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App/>
        </StaticRouter>
      )
      res.send(renderFullPage(html, data))
    })
    // sends error from server to the client view - ** SHOULD BE DEV ONLY **
    .catch(next)
}

const renderFullPage = (tmpl, state) => `
  <!DOCTYPE html>
    <html>
      <head>
        <title>React App</title>
        <link rel='stylesheet' href='/main.css'>
        <script src='/bundle.js' defer></script>
      </head>
      <body>
        <!-- append compiled React app-->
        <div id='root'>${tmpl}</div>
        <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
        window.__PRELOADED_STATE__ = ${serialize(state)}
        </script>
      </body>
    </html>
`

module.exports = app