import {all} from 'redux-saga/effects'
import helloSaga from './helloSaga'


export default function* rootSaga() {
  yield all([
    helloSaga()
  ])
}
