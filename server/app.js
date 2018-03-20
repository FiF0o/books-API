
import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import cors from 'cors'
import reducers from '../src/reducers/'
import App from '../src/app'


const app = express();

app.use(express.static('public'))

app.use(cors())
app.get('*', handleRender)

function handleRender(req, res) {
  let initialState = App.getInitialData()
  Promise.resolve(initialState)
    .then(data => {
      // const store = createStore(reducers, initialState)
      // const preloadedState = store.getState()
      // res.send(renderFullPage(html, preloadedState))
      // const store = createStore(reducers, preloadedState)
      // const store = createStore(reducers, data)
      const html = renderToString(
        <App books={data}/>
      )
      res.send(renderFullPage(html, data))
    })
    .catch(err => console.error(err))
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