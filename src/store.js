import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'


const sagaMiddleware = createSagaMiddleware()


const configureStore = preloadedState =>
createStore(
  reducers,
  preloadedState,
  applyMiddleware(sagaMiddleware)
)


export {
  configureStore,
  sagaMiddleware
}
