import React from 'react';
import 'isomorphic-fetch';

export default class Books extends React.Component {

  constructor(props) {
    super(props)

    /**
     * data from server passed in by the router in order to match client side 
     * when page is rerendered
    */
    let data
    if(__isBrowser__) {
      // Grab the state from the global variable injected into the server-generated HTML
      data = window.__PRELOADED_STATE__
      // Allow the passed state to be garbage-collected
      delete window.__PRELOADED_STATE__
    } else {
      data = props.staticContext.data
    }

    this.state = {
      books: data
    }
  }

  static getInitialData() {
    // fetched from server via route
    return fetch('http://localhost:3000/api/books')
      .then(res => res.json())
      .catch(err => console.error(err))
  }

  componentDidMount() {
    if(!this.state.books) Books.getInitialData()
      .then(data => this.setState({books: data}))
      .catch(err => console.error(err))
  }

  render() {
    const {books} = this.state
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
