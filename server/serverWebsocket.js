const WebSocketServer = require('websocket').server;


const webSocketServerInit = (targetServer) => {
  const wsServer = new WebSocketServer({httpServer: targetServer})

  wsServer.on('request', (clientWs) => {

    // add verification
    const connection = clientWs.accept(null, clientWs.origin);
    console.log(`CONNECTION OPENED: ${new Date()} - connection accepted.`);
  
    connection.on('message', (message) => {
      console.log(`MESSAGE RECEIVED: ${message.utf8Data}`)
      const data = JSON.parse(message.utf8Data)
      const {type, payload} = data
      // echo to client(s)
      switch (type) {
        case 'ADD_BOOK':
          connection.send(
            JSON.stringify({
              type: 'ADD_BOOK',
              payload
            })
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