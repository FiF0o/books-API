'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _server = require('react-dom/server');

var _AppContainer = require('../src/containers/AppContainer');

var _AppContainer2 = _interopRequireDefault(_AppContainer);

var _counter = require('../api/counter');

var _reducers = require('../src/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import path from 'path'
var app = (0, _express2.default)();

// import counterApp from '../src/reducers'
// import App from '../src/containers/App'
/**
 * Created by jonlazarini on 18/02/17.
 */

var port = 3000;

// This is fired every time the server side receives a request
app.use(handleRender);

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
	// Query our mock API asynchronously
	(0, _counter.fetchCounter)(function (apiResult) {
		// Read the counter from the request, if provided
		var params = _qs2.default.parse(req.query);
		var counter = parseInt(params.counter, 10) || apiResult || 0;

		// Compile an initial state
		var preloadedState = { counter: counter };

		// Create a new Redux store instance
		var store = (0, _redux.createStore)(_reducers2.default, preloadedState);

		// Render the component to a string
		var html = (0, _server.renderToString)(_react2.default.createElement(
			_reactRedux.Provider,
			{ store: store },
			_react2.default.createElement(_AppContainer2.default, null)
		));

		// Grab the initial state from our Redux store
		var finalState = store.getState();

		// Send the rendered page back to the client
		res.send(renderFullPage(html, finalState));
	});
}

function renderFullPage(html, preloadedState) {
	return '\n    <!doctype html>\n    <html>\n      <head>\n        <title>Redux Universal Example</title>\n      </head>\n      <body>\n        <div id="root">' + html + '</div>\n        <script>\n          // WARNING: See the following for Security isues with this approach:\n          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations\n          window.__PRELOADED_STATE__ = ' + (0, _stringify2.default)(preloadedState) + '\n        </script>\n        <script src="./index.js"></script>\n      </body>\n    </html>\n    ';
}

/**
 * script is where the bundled file will be served
 */

app.listen(port);
;

var _temp = function () {
	if (typeof __REACT_HOT_LOADER__ === 'undefined') {
		return;
	}

	__REACT_HOT_LOADER__.register(app, 'app', 'bin/server.js');

	__REACT_HOT_LOADER__.register(port, 'port', 'bin/server.js');

	__REACT_HOT_LOADER__.register(handleRender, 'handleRender', 'bin/server.js');

	__REACT_HOT_LOADER__.register(renderFullPage, 'renderFullPage', 'bin/server.js');
}();

;