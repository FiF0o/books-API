import {all} from 'redux-saga/effects'
import {fetchBooksSaga, postBookSaga} from './books'


export default function* rootSaga() {
  yield all([
    fetchBooksSaga(),
    postBookSaga()
  ])
}
