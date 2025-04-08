import { GraphQLSchema } from 'graphql';
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLFloat, GraphQLInt } from 'graphql';
import _ from 'lodash'

// Sample data
let products = [
  {
    id: "1",
    name: "Stackable Chair",
    image: "http://localhost:4000/images/products/product1.jpg",
    price: 87.00,
    category: { id: "1", name: "Chair" },
    details: "A sleek and modern stackable chair perfect for both indoor and outdoor settings. Lightweight yet sturdy, ideal for compact storage.",
    quantity: 5
  },
  {
    id: "2",
    name: "Lamp Tool",
    image: "http://localhost:4000/images/products/product2.jpg",
    price: 35.00,
    category: { id: "1", name: "Lamp" },
    details: "A compact and multifunctional lamp with adjustable brightness. Great for workspaces, reading corners, or nightstands.",
    quantity: 5
  },
  {
    id: "3",
    name: "Dining Chair",
    image: "http://localhost:4000/images/products/product3.jpg",
    price: 55.00,
    category: { id: "1", name: "Chair" },
    details: "Comfortable dining chair with a cushioned seat and a sturdy wooden frame. Blends well with any dining room style.",
    quantity: 5
  },
  {
    id: "4",
    name: "Hand Base Lamp",
    image: "http://localhost:4000/images/products/product4.jpg",
    price: 35.00,
    category: { id: "1", name: "Lamp" },
    details: "A unique lamp with a sculpted hand-shaped base and a soft, warm glow. Adds a creative touch to any room.",
    quantity: 5
  },
  {
    id: "5",
    name: "Stylish Chair",
    image: "http://localhost:4000/images/products/product5.jpg",
    price: 45.00,
    category: { id: "1", name: "Chair" },
    details: "Ergonomically designed stylish chair with a minimalist design. Ideal for offices, home desks, or lounges.",
    quantity: 5
  },
  {
    id: "6",
    name: "Vintage Chair",
    image: "http://localhost:4000/images/products/product6.jpg",
    price: 65.00,
    category: { id: "1", name: "Furniture" },
    details: "A timeless vintage chair featuring a high-back design and classic finish. Perfect for adding character to your living space.",
    quantity: 5
  },
];


// Extracted categories from products
let categories = _.uniqBy(products.map(p => p.category), 'id');

// GraphQL types
const CategoryType  = new GraphQLObjectType({
  name: 'Categories',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  }),
});

const ProductsType = new GraphQLObjectType({
  name: 'Products',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    price: { type: GraphQLFloat },
    category: { type: CategoryType },
    details: { type: GraphQLString },
    quantity: { type: GraphQLInt}
  }),
});

const CartItemType = new GraphQLObjectType({
  name: 'CartItems',
  fields: () => ({
    products: { type: ProductsType },
    quantity: { type: GraphQLInt}
  }),
});


const CartType = new GraphQLObjectType({
  name: 'Cart',
  fields: () => ({
    id: { type: GraphQLID },
    items: { type: new GraphQLList(CartItemType) },
    total: { type: GraphQLFloat }
  }),
});

// Root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    products: {
      type: new GraphQLList(ProductsType),
      resolve() {
        return products
      }
    },
    product: {
      type: ProductsType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        // Function to get data from db
        return _.find(products, {id: args?.id})
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve() {
        return categories
      }
    },
    productsByCategory: {
      type: new GraphQLList(ProductsType),
      args: { categoryId: { type: GraphQLID }},
      resolve(parent, args) {
        return products?.filter(p => p.category?.id === args?.id)
      }
    }
  }
});

// Export RootQuery
export default new GraphQLSchema({
  query: RootQuery
});