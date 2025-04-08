import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from '../schema/schema'
import path from 'path';


// Initialize express app
const app = express();

// Serve static images from the "images" folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// Express-graph module allows express understand graphql
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

// Tell the app to listen to a port e.g port 4000 and a callback function that will be executed when the app starts listening to port 4000
app.listen(5000, () => {
  console.log('Now listening for request on port 4000')
})
