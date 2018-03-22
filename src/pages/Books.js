import React from 'react'
import 'isomorphic-fetch'
import { connect } from 'react-redux'

class Books extends React.Component {

  static getInitialData() {
    // fetched from server via route
    return fetch('http://localhost:3000/api/books')
      .then(res => res.json())
      .catch(err => console.error(err))
  }

  componentDidMount() {
    if(!this.props.books) Books.getInitialData()
      .then(data => this.setState({books: data}))
      .catch(err => console.error(err))
  }

  render() {
    const {books} = this.props

    return (
      <ul>
        {
          books.map(book =>
            <li key={book._id}>
              <p>{book._id}</p>
              <p>{book.title}</p>
              <p>{book.author}</p>
              <p>{book.genre}</p>
              <p>{book.type}</p>
              <p>{book.description}</p>
              <a href={book.link_buy}>{book.link_buy}</a>
              <img src={book.link_img}/>
              <p>
                <i>{Date(String(book.create_date))}</i>
                <button onClick={() => console.log('click')}>click</button>
              </p>
            </li>
          )
        }
      </ul>
    )
  }
}


const mapStateToProps = state => ({
  books: state.books
})


export default connect(mapStateToProps, undefined)(Books)
