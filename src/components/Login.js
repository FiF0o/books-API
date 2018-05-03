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
    const {email, password} = this.state
    if(this.state.login) {
      const result = await this.props.loginPost({
        variables: {email, password}
      })
      const {token} = result.data.login
      const {user: userInfo} = result.data.login
      this._saveUserData(token)
      this.setState({userInfo})
    } else {
      // TODO sign up mutation
      return
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

    const {userInfo} = this.state

    return (
      <section>
        {
          userInfo ?
          <div>
            Welcome, {userInfo.name}<br/><i>{userInfo.email}</i>
            <br/>
            <button onClick={() => this._logOut()}>logout</button>
          </div>
          :
          <form
          onSubmit={e => {
            e.preventDefault()
            this._confirm()
            e.target.reset()
          }}
        >
          <input
            name='email'
            type='text'
            placeholder='Enter your username/email'
            onChange={e => {
              this.setState({email: e.target.value})
            }}
          />
          <input
            name='password'
            type='password'
            placeholder='Enter your password'
            onChange={node => {
              this.setState({password: node.target.value})
            }}
          />
          <button type='submit'>Login</button>
        </form>
        }
      </section>
    )
  }
};


export default compose(
  graphql(LOGIN_QUERY, {name: 'loginPost'})
  // signup mutation
)(Login)
