import {ADD_BOOK, FETCH_BOOKS, FETCH_BOOKS_SUCCESS} from '../actionTypes'


const addBook = (title, author, genre, type, description, link_buy, link_img) => ({
  type: ADD_BOOK,
  payload: {
    _id: Date.now(),
    create_date: Date.now(),
    title,
    author,
    genre,
    type,
    description,
    link_buy,
    link_img
  }
})

const getBooks = () =>  ({
    type: FETCH_BOOKS
})

const getBooksSuccess = payload => ({
  type: FETCH_BOOKS_SUCCESS,
  payload
})


export {
  addBook,
  getBooks,
  getBooksSuccess
}
