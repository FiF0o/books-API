import React from 'react'

export const Books = ({books, addBook, getBooks}) => (
  <div>
    {
      books.map(book =>
        <div
          key={book._id}
          className="mdc-card mdc-card__media"
          style={{marginTop: '4em'}}
        >
          <a
            className="mdc-card__primary-action mdc-ripple-upgraded mdc-ripple-upgraded--foreground-activation"
            href={book.linkBuy}
          >
            <div className='mdc-card__media mdc-card__media--16-9 demo-card__media demo-card__media--16-9' style={{backgroundImage: `url(${book.linkImg})`}}></div>
            <section style={{padding: '1em'}}>
              <div className="demo-card__primary">
                <h2 className="demo-card__title mdc-typography--title">{book.title}&nbsp;
                  <span className="mdc-typography--caption">- ({book.bookType})</span>
                </h2>
                <h3 className="demo-card__subtitle mdc-typography--subheading1">by {book.author}</h3>
                <h4 className="mdc-typography--subheading1">{book.genre}</h4>
              </div>
              <div className="demo-card__secondary mdc-typography--body1">
                {book.description}
                <br/>
                <br/>
                <i>added on: <b>{book.create_date}</b></i>
              </div>

            </section>
          </a>
          <div className="mdc-card__actions">
            <div className="mdc-card__action-buttons">
            </div>
            <div className="mdc-card__action-icons">
            </div>
          </div>
        </div>
      )
    }
  </div>
)
