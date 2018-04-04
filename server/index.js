const app = require('./app');
const http = require('http');
const WebSocketServer = require('websocket').server;


const port = normalizePort(process.env.APP_PORT || '3001');
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

// upgrade server to ws
const wsServer = new WebSocketServer({httpServer: server})

wsServer.on('request', (request) => {

  const connection = request.accept('echo-protocol', request.origin);
  console.log((new Date()) + ' Connection accepted.');

  // sends payload to client
  const json = JSON.stringify({
    type: 'message',
    data: 'hello'
  })
  connection.sendUTF(json)

  // respond back to client 'message' event
  connection.on('message', (message) => {
    connection.sendUTF(
      JSON.stringify({
        type: 'message',
        data: 'pong'
      })
    )
  })

})

wsServer.on('error', onError);
wsServer.on('listening', onListening);


function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}