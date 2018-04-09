import {NOTIFY_BOOK, WS_ADD_BOOK} from '../src/actionTypes'
const WebSocketServer = require('websocket').server;

let clients = [];

const webSocketServerInit = (targetServer) => {
  const wsServer = new WebSocketServer({httpServer: targetServer})

  wsServer.on('request', (clientWs) => {

    // add verification
    const connection = clientWs.accept(null, clientWs.origin);
    console.log(`CONNECTION OPENED: ${new Date()} - connection accepted.`);

    clients.push(connection)
    console.log(`${clients.length} client(s) connected!`)

    connection.on('message', (message) => {
      console.log(`MESSAGE RECEIVED: ${message.utf8Data}`)
      const data = JSON.parse(message.utf8Data)
      const {type, payload} = data
      // echo to client(s)
      switch (type) {
        case NOTIFY_BOOK:
          clients.forEach(c =>
            c.send(
              JSON.stringify({
                type: WS_ADD_BOOK,
                payload
              })
          )
        )
      }
    })
  
    connection.on('close', () => {
      console.log(`CONNECTION CLOSED: ${new Date()} - Peer ${connection.remoteAddress} closed...`)
    })
  
  })

  return wsServer
}

export default webSocketServerInit