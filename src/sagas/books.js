import {call, put, takeEvery} from 'redux-saga/effects'

import {fetchBooks} from '../api'

import {FETCH_BOOKS, FETCH_BOOKS_SUCCESS} from '../actionTypes'
import {getBooksSuccess} from '../actions/books'


/** Get list of books */
function* fetchBooksSaga() {
  yield takeEvery(
    FETCH_BOOKS,
    getBooksData,
    fetchBooks
  )
}

function* getBooksData(asyncFn) {
  try {
    // API call api()
    // throw new Error('b00m!')
    const response = yield call(asyncFn)
    const payload = response.resp
    // dispatch success with payload from api
    yield put(getBooksSuccess(payload))
  } catch(e) {
    console.error(e)
  }
}


export {
  fetchBooksSaga
}
