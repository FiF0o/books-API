import React from 'react'
import { Mutation } from "react-apollo"
import gql from "graphql-tag"


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

export const Login = () => (
  <Mutation mutation={LOGIN_QUERY} fetchPolicy="network-only">
    {
      (loginPost, {loading, error, data}) => {
       
        if (loading) {
          return <p>Logging in...</p>;
        }

        if (error) {
          return <p>Failed login! 😭</p>
        }
        if (data) {
          const {login} = data
          window.localStorage.setItem('token', login.token)
          return (
            <span>
              <p>
                Welcome <em>{login.user.name}</em> - <i>({login.user.email}).</i>
                <br/>
                <button
                  onClick={() => {
                    console.log('logout')
                    // call your auth logout code then reset store
                    // App.logout().then(() => client.resetStore());
                  }}
                >
                  Log out
                </button>
              </p>
            </span>
          );
        }
        return (
          <form
            onSubmit={e => {
              //TODO Remove hardcoded values for text inputs 😭
              const email = e.target['email']
              const password = e.target['password']
              e.preventDefault()
              loginPost({variables: {email: email.value, password: password.value}})
              e.target.reset()
            }}
          >
            <input
              name='email'
              ref={node => {
                let input = node
              }}
            />
            <input
              name='password'
              type='password'
              ref={node => {
                let input = node
              }}
            />
            <button type='submit'>Login</button>
          </form>
        )
      }
    }
  </Mutation>
);
