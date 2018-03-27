import React from 'react'
import 'isomorphic-fetch'
import { connect } from 'react-redux'

import {addBook, getBooks} from '../actions/books'

import {Books} from '../components/Books'

import {postBook} from '../api'


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
    const {title, author, genre, type, description, linkBuy, linkImg} = e.target
    postBook({
      title: title.value,
      author: author.value,
      genre: genre.value,
      type: type.value,
      description: description.value,
      linkBuy: linkBuy.value,
      linkImg: linkImg.value
    })
    this.props.addBook(title.value, author.value, genre.value, type.value, description.value, linkBuy.value, linkImg.value)
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
          <label htmlFor='type'>type</label>
          <input type='text' name='type' id='type'/>
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
  books: state.books
})

const mapDispatchToProps = dispatch => ({
  addBook: (title, author, genre, type, description, link_buy, link_img) =>
    dispatch(addBook(title, author, genre, type, description, link_buy, link_img)),
  getBooks: () => dispatch(getBooks()),
});


export default connect(mapStateToProps, mapDispatchToProps)(BooksContainer)
