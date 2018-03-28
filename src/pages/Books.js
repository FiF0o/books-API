import React from 'react'
import 'isomorphic-fetch'
import { connect } from 'react-redux'

import {getBooks, postBook} from '../actions/books'

import {Books} from '../components/Books'


class BooksContainer extends React.Component {
  constructor(props) {
    super(props)
    this._handleSubmit = this._handleSubmit.bind(this)
  }
  static getInitialData() {
    // fetched from server via route - TODO replace by a dispatched action
    return fetch('http://localhost:3000/api/books')
      .then(res => res.json())
      .catch(err => console.error(err))
  }

  _handleSubmit(e) {
    e.preventDefault()
    const {title, author, genre, bookType, description, linkBuy, linkImg} = e.target
    this.props.postBook({
      title: title.value,
      author: author.value,
      genre: genre.value,
      bookType: bookType.value,
      description: description.value,
      linkBuy: linkBuy.value,
      linkImg: linkImg.value
    })
    e.target.reset()
  }

  componentDidMount() {
    if(!this.props.books) {
      this.props.getBooks()
    }
  }

  render() {
    const {addBook, books, getBooks} = this.props

    return (
      <section>
        <form
          onSubmit={this._handleSubmit}
          method="post"
        >
          <label htmlFor='title'>title</label>
          <input type='text' name='title' id='title'/>
          <br/>
          <label htmlFor='author'>author</label>
          <input type='text' name='author' id='author'/>
          <br/>
          <label htmlFor='genre'>genre</label>
          <input type='text' name='genre' id='genre'/>
          <br/>
          <label htmlFor='bookType'>type</label>
          <input type='text' name='bookType' id='bookType'/>
          <br/>
          <label htmlFor='description'>description</label>
          <input type='text' name='description' id='description'/>
          <br/>
          <label htmlFor='linkBuy'>link_buy</label>
          <input type='text' name='linkBuy' id='linkBuy'/>
          <br/>
          <label htmlFor='linkImg'>link_img</label>
          <input type='text' name='linkImg' id='linkImg'/>
          <br/>
          <input type='submit' value='submit'/>
        </form>
        <Books
          books={books}
          addBook={addBook}
          getBooks={getBooks}
        />
      </section>
    )
  }
}


const mapStateToProps = state => ({
  books: state.books.bookList
})

const mapDispatchToProps = dispatch => ({
  postBook: (title, author, genre, type, description, link_buy, link_img) =>
    dispatch(postBook(title, author, genre, type, description, link_buy, link_img)),
  getBooks: () => dispatch(getBooks()),
});


export default connect(mapStateToProps, mapDispatchToProps)(BooksContainer)
