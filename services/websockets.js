import {postBook} from '../src/actions/books'

// client side
export const initWebsocket = () => {
  const socket = new WebSocket(`ws://localhost:${process.env.APP_PORT || 3001}`)
  return socket
}
