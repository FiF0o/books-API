import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link';

import {AUTH_TOKEN} from './constants'


const httpLink = new HttpLink({ uri: 'http://localhost:3000' })

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  // https://www.apollographql.com/docs/react/advanced/network-layer.html
  operation.setContext({
    headers: {
      authorization: token || null,
    }
  })
  return forward(operation)
});

const configureApollo = () => new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache()
})
 
export {
  configureApollo
}
