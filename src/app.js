import React from 'react';
import AppContainer from './containers/AppContainer'
// import store from './store'

import './main.css'

/*const State = () =>
  <Provider store={store}>
    <AppContainer/>
  </Provider>
;*/

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>It Works!</h1>
        <p>This React project just works including <span className="redBg">module</span> local styles.</p>
        <p>Enjoy!</p>
        {
          /*`${State}`*/
        }
      </div>
    )
  }
}
