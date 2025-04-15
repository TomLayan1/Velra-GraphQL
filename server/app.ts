import express from 'express';
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import schema from '../schema/schema'
import path from 'path';



// Initialize express app
const app = express();


const MONGODB = 'mongodb+srv://tomisin:password%401%402%25@velracluster.trjwqtg.mongodb.net/?retryWrites=true&w=majority&appName=VelraCluster';
mongoose.connect(MONGODB);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
})

// Serve static images from the "images" folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// Express-graph module allows express understand graphql
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

// Tell the app to listen to a port e.g port 4000 and a callback function that will be executed when the app starts listening to port 4000
app.listen(5000, () => {
  console.log('Now listening for request on port 5000')
})
