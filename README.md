# Velra GraphQL

**Velra GraphQL** is a GraphQL-powered backend service for an e-commerce platform that enables dynamic querying of products, user registration, and personalized cart management.

## Features

- GraphQL API built with `express-graphql` and `graphql`
- Query for products with rich details like name, price, image, and category
- User registration with cart initialization
- Dynamic cart item structure including product details, quantity, and total price
- Clean and extensible codebase

## Project Structure
```
Velra-GraphQL/
├── node_modules/
├── images/
│   └── products/
├── index.ts
├── schema/
│   └── schema.ts
├── package.json
└── README.md
```

## Technologies Used

- **Node.js**
- **Nodemon**
- **Mongodb**
- **Express**
- **TypeScript**
- **GraphQL**
- **Lodash**

## Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/yourusername/Velra-GraphQL.git
cd Velra-GraphQL
npm install --legacy-peer-deps
```

## Running the Server
```bash
npm run dev
```
Server will run on: http://localhost:5000/graphql

# To Do
- Add authentication with JWT

- Implement user signup & login

- Enable cart updates (add/remove items)

- Connect to a database (MongoDB)

- Build a frontend for interaction
  
- Build a dashboard to manage the app

# Author
TomLayan

Feel free to fork, star, or contribute to this project!
