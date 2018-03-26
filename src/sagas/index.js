import {all} from 'redux-saga/effects'
import {fetchBooksSaga} from './books'


export default function* rootSaga() {
  yield all([
    fetchBooksSaga()
  ])
}
