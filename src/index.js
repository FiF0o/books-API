import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
// import AppContainer from './containers/AppContainer'
import App from './app'
import reducers from './reducers'

import './main.css'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

// const store = createStore(reducers, preloadedState)


render(
  <App books={preloadedState}/>,
  document.getElementById('root')
)
