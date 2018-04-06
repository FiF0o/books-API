import {eventChannel} from 'redux-saga'
import {take, actionChannel, call} from 'redux-saga/effects'
import {initWebsocket} from '../../services/websockets'


function watchBooks(ws, dispatch) {
  
  return eventChannel(emit => {
    
    ws.onopen = () => {
      ws.send(
        JSON.stringify(
          {type: 'ADD_BOOK', payload: {foo: 'bar'}}
        )
      )
    }
    
    ws.onmessage = (event) => {
      
      const message = JSON.parse(event.data)
      const {type, payload} = message

      // handling client(s) dispatching events
      switch (type) {
        case 'ADD_BOOK':
          dispatch({type: 'DEBUG'})
        default:
          break
      } 
    }

    ws.onerror = (err) => {
      console.error(err)
    }

    ws.onclose = (connection) => {
      console.log(`client connection closed - ${connection.code}`)
    }

    return () => {
      console.log('closing channel...')
      ws.close()
    }
  })
}

function* wsHandling(dispatch) {
  while(true) {
    const data = yield take('INIT_WEBSOCKET')
    const ws = initWebsocket()
    const socketChannel = yield call(watchBooks, ws, dispatch)
  }
}


export default wsHandling
