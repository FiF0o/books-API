import {call, put, takeEvery, takeLatest, select} from 'redux-saga/effects'

import {fetchBooks, postBook} from '../api'

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

/** POST books to API */
function* postBookSaga() {
  yield takeLatest('POST_BOOK', writeBookToApi)
}

function* writeBookToApi() {
  try {

    const bookToAdd = yield select(state => {
      return state.books.book
    })
    const response = yield call(postBook, {...bookToAdd})
    const data = response.resp
    yield put({type: 'POST_BOOK_SUCCESS', payload: data})
  } catch(e) {
    console.error(e)
  }
}


export {
  fetchBooksSaga,
  postBookSaga
}
