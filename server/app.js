
import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from '../src/reducers/'
import App from '../src/app'


const app = express();

app.use(express.static('public'))

app.use(handleRender)

function handleRender(req, res) {
  // from req. / client side, fetch data for initial state to get passed in the view - DB, API, etc..
  let initialState = undefined

  const store = createStore(reducers, initialState)

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  const preloadedState = store.getState()

  res.send(renderFullPage(html, preloadedState))
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
        window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
        </script>
      </body>
    </html>
`

module.exports = app