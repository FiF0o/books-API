import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  const newHeader = {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
  }
  return newHeader
});

const configureApollo = (httpLink) => new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export {
  configureApollo
}
