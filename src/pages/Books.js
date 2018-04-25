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
  // static getInitialData() {
  //   // fetched from server via route - TODO replace by a dispatched action
  //   return fetch('http://localhost:3000/api/books')
  //     .then(res => res.json())
  //     .catch(err => console.error(err))
  // }

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

  // componentDidMount() {
  //   if(!this.props.books) {
  //     this.props.getBooks()
  //   }
  // }

  render() {
    // const {addBook, books, getBooks} = this.props
    const books = [
      {
        _id: '1',
        title: 'title',
        author: 'author',
        bookType: 'paperback',
        genre: 'genre',
        description: 'description',
        linkBuy: 'https://www.waterstones.com/book/the-ashes-of-london/andrew-taylor/9780008119096',
        linkImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Minus_font_awesome.svg/2000px-Minus_font_awesome.svg.png',
        create_date: JSON.stringify(new Date())
      },
      {
        _id: '2',
        title: 'title',
        author: 'author',
        bookType: 'paperback',
        genre: 'genre',
        description: 'description',
        linkBuy: 'https://www.waterstones.com/book/the-ashes-of-london/andrew-taylor/9780008119096',
        linkImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Minus_font_awesome.svg/2000px-Minus_font_awesome.svg.png',
        create_date: JSON.stringify(new Date())
      },
    ]

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


export default BooksContainer
