import React from 'react'


/* <div className="mdc-card__media-content">{book.title}</div> */
export const Books = ({books, addBook, getBooks}) => (
  <div>
    {
      books.map(book =>
        <div
          key={book._id}
          className="mdc-card__media"
          style={{marginTop: '4em'}}
        >
          <a className="mdc-card__primary-action mdc-ripple-upgraded mdc-ripple-upgraded--foreground-activation">
            <div className='mdc-card__media mdc-card__media--16-9 demo-card__media demo-card__media--16-9' style={{backgroundImage: `url(${book.link_img})`}}></div>
            <div className="demo-card__primary">
              <h2 className="demo-card__title mdc-typography--title">Our Changing Planet</h2>
              <h3 className="demo-card__subtitle mdc-typography--subheading1">by Kurt Wagner</h3>
            </div>
            <div className="demo-card__secondary mdc-typography--body1">
              Visit ten places on our planet that are undergoing the biggest changes today.
            </div>
          </a>
        </div>
      )
    }
  </div>
)
