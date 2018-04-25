import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'


const configureApollo = (httpLink) => new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export {
  configureApollo
}
