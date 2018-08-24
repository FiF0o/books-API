import React from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { AUTH_TOKEN } from '../constants'


const LOGIN_QUERY = gql`
  mutation loginPost($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

const SIGNUP_QUERY = gql`
  mutation signupPost($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;


// stateless: https://www.apollographql.com/docs/react/essentials/mutations.html
class Login extends React.Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
    userInfo: null,
    // loading
    // error
  }
  // persist login data when switching between pages/navigating

  _confirm = async () => {
    const {email, password, name} = this.state
    if(this.state.login) {
      const result = await this.props.loginPost({
        variables: {email, password}
      })
      const {token} = result.data.login
      const {user: userInfo} = result.data.login
      this._saveUserData(token)
      this.setState({userInfo})
    } else {
        const result = await this.props.signupPost({
          variables: {email, password, name}
        })
        const {token} = result.data.signup
        const {user: userInfo} = result.data.signup
        this._saveUserData(token)
        this.setState({userInfo})
    }
    // this.props.history.push('/')
  }

  _saveUserData = token =>
    window.localStorage.setItem(AUTH_TOKEN, token);

  _logOut() {
    window.localStorage.removeItem(AUTH_TOKEN)
    // detroy/invalidate token on the server if stored
    this.props.history.push(`/`)
  }

  render() {
    // loading state

    // error state

    const {userInfo, login: isLogged} = this.state

    return (
      <section>
        <div>
          <button
            onClick={() => this.setState({login: !isLogged})}
            className='mdc-button'
          >
            {isLogged ? 'need to create an account?' : 'already have an account?'}
          </button>
        </div>
        {
          userInfo ?
          <div>
            <h3
              className='mdc-typography--caption'
            >
              Welcome, {userInfo.name}<br/><i>{userInfo.email}</i>
            </h3>
            <br/>
            <button
              onClick={() => this._logOut()}
              className='mdc-button mdc-button--raised mdc-button--dense'
            >
              logout
            </button>
          </div>
          :
          <form
            onSubmit={e => {
              e.preventDefault()
              this._confirm()
              e.target.reset()
            }}
            className=''
        >
          {!isLogged && (
            <input
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Your name"
              className='mdc-text-field__input'
            />
          )}
          <input
            name='email'
            type='text'
            placeholder='Enter your username/email'
            onChange={e => {
              this.setState({email: e.target.value})
            }}
            className='mdc-text-field__input'
          />
          <br/>
          <input
            name='password'
            type='password'
            placeholder='Enter your password'
            onChange={node => {
              this.setState({password: node.target.value})
            }}
            className='mdc-text-field__input'
          />
          <br/>
          <br/>
          <br/>
          <button
            type='submit'
            className='mdc-button mdc-button--raised mdc-button--dense'
          >
            {isLogged ? 'login' : 'create account'}
          </button>
        </form>
        }
      </section>
    )
  }
};


export default compose(
  graphql(LOGIN_QUERY, {name: 'loginPost'}),
  graphql(SIGNUP_QUERY, {name: 'signupPost'})
)(Login)
