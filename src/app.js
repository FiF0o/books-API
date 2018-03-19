import React from 'react';
import 'isomorphic-fetch';

export default class App extends React.Component {

  constructor(props) {
    super(props)

    /** data from server matching client side */
    let data = props.books

    this.state = {
      books: data
    }
  }

  static getInitialData() {
    // fetched from server
    return fetch('http://localhost:3000/api/books')
      .then(res => res.json())
      .catch(err => console.error(err))
  }

  componentDidMount() {
    if(!this.state.books) App.getInitialData()
      .then(data => this.setState({books: data}))
      .catch(err => console.error(err))
  }

  render() {
    const {books} = this.state
    return (
      <div>
        <h1>Hello React!</h1>
        <p>This React project just works including <span className="redBg">module</span> local styles.</p>
        <button onClick={() => console.log('click')} >click</button>
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
                </p>
              </li>
            )
          }
        </ul>
      </div>
    )
  }
}
