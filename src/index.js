import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import {configureStore, sagaMiddleware} from './store'
import {configureRootSaga} from './sagas'
import reducers from './reducers'

import {initWebsocket} from '../services/websockets'

import App from './app'
import './main.css'


// Grab the state from the global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__


const store = configureStore(preloadedState)


sagaMiddleware.run(configureRootSaga(store.dispatch))


// opens a ws
store.dispatch({type: 'INIT_WEBSOCKET'})


render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
