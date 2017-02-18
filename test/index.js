/**
 * Created by jonlazarini on 18/02/17.
 */
import http from 'http';
import assert from 'assert';

import '../public/server.js';

describe('Example Node Server', () => {
	it('should return 200', done => {
		http.get('http://127.0.0.1:1337', res => {
			assert.equal(200, res.statusCode);
			done();
		});
	});
});
