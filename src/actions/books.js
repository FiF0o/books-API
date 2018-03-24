import {ADD_BOOK} from '../actionTypes'

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


export {
  addBook
}
