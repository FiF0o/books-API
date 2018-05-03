import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import CreateBooks from '../components/CreateBooks'
import {Books} from '../components/Books'

import {AUTH_TOKEN} from '../constants'


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

  render() {

    if (this.props.bookQuery && this.props.bookQuery.loading) {
      return <div>Loading...</div>
    }

    if (this.props.bookQuery && this.props.bookQuery.error) {
      return <div>💥 Error! 😭</div>
    }

    const books = this.props.bookQuery.getBooks.books
    const authToken = window.localStorage.getItem(AUTH_TOKEN)

    return (
      authToken ?
        <div className="mdc-layout-grid__inner">

          <div className="mdc-layout-grid__cell--span-12">
            <h1 className="mdc-typography--display1">Books</h1>
            <h2 className="mdc-typography--headline">Add your book</h2>
          </div>

          <div className="mdc-layout-grid__cell--span-12">
            <CreateBooks/>
          </div>

          <div className=" mdc-layout-grid__cell--span-12" >
            <h2 className="mdc-typography--headline">List of books</h2>
          </div>

          <div className="mdc-layout-grid__cell--span-12">
            <Books
              books={books}
            />
          </div>
        </div> : <p>Please login</p>
    )
  }
}


export default graphql(BOOK_QUERY, { name: 'bookQuery' })(BooksContainer)
