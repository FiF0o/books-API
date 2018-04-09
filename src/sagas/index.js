import {all} from 'redux-saga/effects'
import {fetchBooksSaga, postBookSaga} from './books'
import wsHandling from './newBook'


const configureRootSaga = (dispatch) => {
  return function* rootSaga() {
    yield all([
      fetchBooksSaga(),
      postBookSaga(),
      wsHandling(dispatch),
    ])
  }
}

export {
  configureRootSaga
}
