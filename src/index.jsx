/**
 * Created by jonlazarini on 13/02/17.
 */
// import React from 'react';
import { render } from 'react-dom';
import App from './app.jsx';
// import { AppContainer } from 'react-hot-loader';
//
// render( <AppContainer><App/></AppContainer>, document.querySelector("#app"));
//
// if (module && module.hot) {
//     module.hot.accept('./app.jsx', () => {
// 			{/*const App = require('./app.jsx').default;*/}
//         render(
//             <AppContainer>
//                 <App/>
//             </AppContainer>,
//             document.querySelector("#app")
//         );
//     });
// }


render(
	<App />,
	document.getElementById('root')
)
