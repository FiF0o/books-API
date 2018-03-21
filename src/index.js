import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
// import AppContainer from './containers/AppContainer'
import App from './app'
import reducers from './reducers'

import './main.css'


render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
)
