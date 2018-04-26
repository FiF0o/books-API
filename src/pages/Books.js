import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import {getBooks, postBook} from '../actions/books'

import {Books} from '../components/Books'

const BOOK_QUERY = gql`
  query bookQuery {
    getBooks {
      books {
        id
        author
        title
        bookType
        # genre
        description
        linkImg
        linkBuy
        favorite
        # postedBy {}
      }
    }
  }
`


class BooksContainer extends React.Component {
  constructor(props) {
    super(props)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleSubmit(e) {
    e.preventDefault()
    const {title, author, genre, bookType, description, linkBuy, linkImg} = e.target
    // this.props.postBook({
    //   title: title.value,
    //   author: author.value,
    //   genre: genre.value,
    //   bookType: bookType.value,
    //   description: description.value,
    //   linkBuy: linkBuy.value,
    //   linkImg: linkImg.value
    // })
    e.target.reset()
  }

  render() {

    if (this.props.bookQuery && this.props.bookQuery.loading) {
      return <div>Loading...</div>
    }

    if (this.props.bookQuery && this.props.bookQuery.error) {
      return <div>💥 Error! 😭</div>
    }

    const books = this.props.bookQuery.getBooks.books

    return (
      <div className="mdc-layout-grid__inner">

        <div className="mdc-layout-grid__cell--span-12">
          <h1 className="mdc-typography--display1">Books</h1>
          <h2 className="mdc-typography--headline">Add your book</h2>
        </div>

        <div className="mdc-layout-grid__cell--span-12">
          <form
            onSubmit={this._handleSubmit}
            method="post"
          >
            <br/>
            <input type='text' name='title' id='title' className="mdc-text-field__input" placeholder="Title"/>
            <br/>
            <input type='text' name='author' id='author' className="mdc-text-field__input" placeholder="Author"/>
            <br/>
            <input type='text' name='genre' id='genre' className="mdc-text-field__input" placeholder="Genre"/>
            <br/>
            <input type='text' name='bookType' id='bookType' className="mdc-text-field__input" placeholder="Type of book"/>
            <br/>
            <input type='text' name='description' id='description' className="mdc-text-field__input" placeholder="Description"/>
            <br/>
            <input type='text' name='linkBuy' id='linkBuy' className="mdc-text-field__input" placeholder="Link to buy"/>
            <br/>
            <input type='text' name='linkImg' id='linkImg' className="mdc-text-field__input" placeholder="Link for image"/>
            <br/>
            <button
              className="mdc-button mdc-button--raised mdc-button--dense"
              type='submit'
              value='submit'
              style={{
                marginTop: '2em',
                marginBottom: '4em'
              }}
            >
              Submit
            </button>
          </form>
        </div>

        <div className=" mdc-layout-grid__cell--span-12" >
          <h2 className="mdc-typography--headline">List of books</h2>
        </div>

        <div className="mdc-layout-grid__cell--span-12">
          <Books
            books={books}
          />
        </div>
      </div>
    )
  }
}


export default graphql(BOOK_QUERY, { name: 'bookQuery' })(BooksContainer)
