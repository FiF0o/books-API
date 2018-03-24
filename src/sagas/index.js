import {all} from 'redux-saga/effects'
import {booksSaga} from './books'


export default function* rootSaga() {
  yield all([
    booksSaga()
  ])
}
