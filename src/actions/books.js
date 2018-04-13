import {ADD_BOOK, FETCH_BOOKS, FETCH_BOOKS_SUCCESS, POST_BOOK, POST_BOOK_SUCCESS} from '../actionTypes'


const getBooks = () =>  ({
    type: FETCH_BOOKS
})

const getBooksSuccess = payload => ({
  type: FETCH_BOOKS_SUCCESS,
  payload
})

const postBook = ({title, author, genre, bookType, description, linkBuy, linkImg}) => ({
  type: POST_BOOK,
  title,
  author,
  genre,
  bookType,
  description,
  linkBuy,
  linkImg,
  favorite: false
})

const postBookSuccess = payload => ({
  type: POST_BOOK_SUCCESS,
  payload
})


export {
  getBooks,
  getBooksSuccess,
  postBook,
  postBookSuccess
}
