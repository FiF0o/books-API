import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'

import {configureApollo} from './store'

import App from './app'
import './styles/main.css'


//TODO Apollo serverside rehydration
// https://www.apollographql.com/docs/react/features/server-side-rendering.html
const httpLink = new HttpLink({ uri: 'http://localhost:3000' })


render(
  <ApolloProvider client={configureApollo(httpLink)}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
