/**
 * Created by jonlazarini on 13/02/17.
 */
import React from 'react';
import AppContainer from './containers/AppContainer'
import store from './store'

// Grab the state from a global variable injected into the server-generated HTML
// const preloadedState = window.__PRELOADED_STATE__

// Create Redux store with initial state
// const store = createStore(counterApp, preloadedState)


export default class App extends React.Component {
    render() {
    	console.log('DID IT load?')
        return (
            <div>
            <h1>It Works!</h1>
        <p>This React project just works including <span className="redBg">module</span> local styles.</p>
        <p>Enjoy!</p>
				<Provider store={store}>
					<AppContainer/>

				</Provider>
        </div>
    )
    }
}
