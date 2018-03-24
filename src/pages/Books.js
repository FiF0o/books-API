import React from 'react'
import 'isomorphic-fetch'
import { connect } from 'react-redux'
import {addBook} from '../actions/books'
import {Books} from '../components/Books'

class BooksContainer extends React.Component {
  static getInitialData() {
    // fetched from server via route
    return fetch('http://localhost:3000/api/books')
      .then(res => res.json())
      .catch(err => console.error(err))
  }

  componentDidMount() {
    if(!this.props.books) BooksContainer.getInitialData()
    .catch(err => console.error(err))
  }

  render() {
    const {addBook, books} = this.props

    return (
      <section>
        <Books
          books={books}
          addBook={addBook}
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
});


export default connect(mapStateToProps, mapDispatchToProps)(BooksContainer)
