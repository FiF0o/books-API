import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { ApolloProvider } from 'react-apollo'

import {configureApollo} from './store'

import App from './app'
import './styles/main.css'


//TODO Apollo serverside rehydration
// https://www.apollographql.com/docs/react/features/server-side-rendering.html



const client = configureApollo()


render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
