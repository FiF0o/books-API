/**
 * Created by jonlazarini on 18/02/17.
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import reducers from './reducers';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Create Redux store with initial state
export default createStore(
	reducers,
	preloadedState,
	applyMiddleware(thunk),
)
