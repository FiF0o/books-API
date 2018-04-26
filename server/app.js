
import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'
import cors from 'cors'
import {StaticRouter} from 'react-router-dom'
import serialize from 'serialize-javascript'
import sourceMapSupport from 'source-map-support'

import { getDataFromTree } from 'react-apollo'
import { ApolloProvider, renderToStringWithData } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import fetch from 'node-fetch'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'


import App from '../src/app'


if (process.env.NODE_ENV === "development") {
  sourceMapSupport.install();
}


const app = express();


app.use(express.static('public'))
app.use(handleRender)

function handleRender(req, res, next) {

  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'http://localhost:3000',
      fetch: fetch,
      credentials: 'same-origin',
      headers: {
        cookie: req.header('Cookie'),
      },
    }),
    cache: new InMemoryCache(),
  });

  const context = {}

  const component = renderToString(
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  )

  getDataFromTree(component)
    .then(() => {
      //TODO - Load data from server side: https://www.apollographql.com/docs/react/advanced/fragments.html
      const preloadedState = client.extract()
      res
        .status(200)
        .send(renderFullPage(component, preloadedState))
        .end()
    })

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
