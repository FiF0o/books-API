import {postBook} from '../src/actions/books'

// client side
export const initWebsocket = (dispatch) => {
  const socket = new WebSocket(`ws://localhost:${process.env.APP_PORT || 3001}`)
  
  socket.onopen = (connection) => {
    //debug
    socket.send(
      JSON.stringify({
        type: 'ADD_BOOK',
        payload: {
          author: 'a'
        }
      })
    )
  }

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data)
    const {type, payload} = message

    // handling client(s) dispatching events
    switch (type) {
      case 'ADD_BOOK':
        // dispatch(postBook({...payload}))
      default:
        break
    }

  }

  socket.onerror = (err) => {
    console.error(err)
  }

  socket.onclose = (connection) => {
    console.log(`client connection closed - ${connection.code}`)
  }

  return socket

}
