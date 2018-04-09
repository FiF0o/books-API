import {eventChannel} from 'redux-saga'
import {take, actionChannel, call} from 'redux-saga/effects'
import {initWebsocket} from '../../services/websockets'
import {NOTIFY_BOOK, WS_ADD_BOOK, POST_BOOK_SUCCESS} from '../actionTypes'

function watchBooks(data, ws, dispatch) {
  
  return eventChannel(emit => {
    
    ws.onopen = (event) => {
      const {payload: bookData} = data
        switch(data.type) {
          case POST_BOOK_SUCCESS:
            ws.send(
              JSON.stringify(
                {type: NOTIFY_BOOK, payload: {...bookData}}
              )
            )
          default:
            return
        }
    }
    
    ws.onmessage = (event) => {
      
      const message = JSON.parse(event.data)
      const {type, payload} = message
      // handling client(s) dispatching events
      switch (type) {
        case WS_ADD_BOOK:
          dispatch(message)
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
    const data = yield take(POST_BOOK_SUCCESS)
    const ws = initWebsocket()
    yield call(watchBooks, data, ws, dispatch)
  }
}


export default wsHandling
