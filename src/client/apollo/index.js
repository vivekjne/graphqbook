import { ApolloClient, from, HttpLink } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-boost";
import gql from "graphql-tag";

const link = from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: 
          ${locations}, Path: ${path}`)
      );
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }
  }),
  new HttpLink({
    uri: "http://localhost:8000/graphql",
  }),
]);
const client = new ApolloClient({
  link,

  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      {
        posts {
          id
          text
          user {
            avatar
            username
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));

export default client;
