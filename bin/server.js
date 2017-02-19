/**
 * Created by jonlazarini on 18/02/17.
 */
import qs from 'qs'
// import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
// import counterApp from '../src/reducers'
// import App from '../src/containers/App'
import AppContainer from '../src/containers/AppContainer'
import { fetchCounter } from '../api/counter'
import reducers from '../src/reducers';

const app = Express()
const port = 3000

// This is fired every time the server side receives a request
app.use(handleRender)


// We are going to fill these out in the sections to follow
function handleRender(req, res) {
	// Query our mock API asynchronously
	fetchCounter(apiResult => {
		// Read the counter from the request, if provided
		const params = qs.parse(req.query)
		const counter = parseInt(params.counter, 10) || apiResult || 0

		// Compile an initial state
		let preloadedState = { counter }

		// Create a new Redux store instance
		const store = createStore(reducers, preloadedState)

		// Render the component to a string
		const html = renderToString(
			<Provider store={store}>
				<AppContainer />
			</Provider>
		)

		// Grab the initial state from our Redux store
		const finalState = store.getState()

		// Send the rendered page back to the client
		res.send(renderFullPage(html, finalState))
	})
}


function renderFullPage(html, preloadedState) {
	return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for Security isues with this approach:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="./index.js"></script>
      </body>
    </html>
    `
}

/**
 * script is where the bundled file will be served
 */

app.listen(port)
