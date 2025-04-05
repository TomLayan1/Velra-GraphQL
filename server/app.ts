import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

// Define a basic GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Define a resolver for the schema
const root = {
  hello: () => {
    return 'Hello world!';
  },
};

// Initialize express app
const app = express();

// Express-graph module allows express understand graphql
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // enables the GraphiQL UI at /graphql
}))

// Tell the app to listen to a port e.g port 4000 and a callback function that will be executed when the app starts listening to port 4000
app.listen(4000, () => {
  console.log('Now listening for request on port 4000')
})
