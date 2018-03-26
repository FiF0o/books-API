import React from 'react'


export const Books = ({books, addBook, getBooks}) => (
  <div>
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
