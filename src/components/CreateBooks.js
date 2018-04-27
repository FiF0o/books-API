import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


class CreateBooks extends Component {
  state = {
    title: '',
    author: '',
    // genre: '',
    bookType: '',
    description: '',
    linkBuy: '',
    linkImg: '',
    favorite: false
  }


  render() {
    // loading state
    // error state
    return (
      <div>
        <input
          value={this.state.title}
          onChange={e => this.setState({title: e.target.value})}
          type='text'
          className="mdc-text-field__input"
          placeholder="Title"
        />
        <br/>
        <input
          value={this.state.author}
          onChange={e => this.setState({author: e.target.value})}
          type='text'
          className="mdc-text-field__input"
          placeholder="Author"
        />
        <br/>
        <input
          type='text'
          className="mdc-text-field__input"
          placeholder="Genre"
        />
        <br/>
        <input
          value={this.state.bookType}
          onChange={e => this.setState({bookType: e.target.value})}
          type='text'
          className="mdc-text-field__input"
          placeholder="Type of book"
        />
        <br/>
        <input
          value={this.state.description}
          onChange={e => this.setState({description: e.target.value})}
          type='text'
          className="mdc-text-field__input"
          placeholder="Description"
        />
        <br/>
        <input
          value={this.state.linkBuy}
          onChange={e => this.setState({linkBuy: e.target.value})}
          type='text'
          className="mdc-text-field__input"
          placeholder="Link to buy"
        />
        <br/>
        <input
          value={this.state.linkImg}
          onChange={e => this.setState({linkImg: e.target.value})}
          type='text'
          className="mdc-text-field__input"
          placeholder="Link for image"
        />
        <button
          onClick={() => this._createBooks()}
          className="mdc-button mdc-button--raised mdc-button--dense"
          value='submit'
          style={{
            marginTop: '2em',
            marginBottom: '4em'
          }}
        >
          Submit
        </button>
      </div>
    )
  }

  _createBooks = async () => {
    const {title, author, genre, description, bookType, linkImg, linkUrl, favorite} = this.state
    await this.props.postMutation({
      variables: {
        title,
        author,
        genre,
        description,
        bookType,
        linkImg,
        linkUrl,
        favorite
      }
    })
  }
}

const POST_MUTATION = gql`
  mutation PostMutation($title: String!, $author: String!, $description: String!, $favorite: Boolean!) {
    postBook(title: $title, author: $author, description: $description, favorite: $favorite) {
      id
      title
      author
      description
      favorite
    }
  }
`

export default graphql(POST_MUTATION, {name: 'postMutation'})(CreateBooks)
