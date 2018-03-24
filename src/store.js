import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'


const composeEnhancers =
typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose;
const sagaMiddleware = createSagaMiddleware()


const middleware = [
  sagaMiddleware
]


const configureStore = preloadedState =>
createStore(
  reducers,
  preloadedState,
  composeEnhancers(applyMiddleware(...middleware))
)


export {
  configureStore,
  sagaMiddleware
}
