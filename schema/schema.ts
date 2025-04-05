import { GraphQLSchema } from 'graphql';
import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLFloat, GraphQLInt } from 'graphql';


let products = [
  {
    id: "1",
    name: "Stackable Chair",
    image: "http://localhost:4000/images/products/product1.jpg",
    price: 87.00,
    category: { id: "1", name: "Chair" },
    details: ""
  },
  {
    id: "2",
    name: "Lamp Tool",
    image: "http://localhost:4000/images/products/product2.jpg",
    price: 35.00,
    category: { id: "1", name: "Lamp" },
    details: "Soft leather armchair"
  },
  {
    id: "3",
    name: "Dining Chair",
    image: "http://localhost:4000/images/products/product3.jpg",
    price: 55.00,
    category: { id: "1", name: "Chair" },
    details: "Soft leather armchair"
  },
  {
    id: "4",
    name: "Hand Base Lamp",
    image: "http://localhost:4000/images/products/product4.jpg",
    price: 35.00,
    category: { id: "1", name: "Lamp" },
    details: "Soft leather armchair"
  },
  {
    id: "5",
    name: "Stylish Chair",
    image: "http://localhost:4000/images/products/product5.jpg",
    price: 45.00,
    category: { id: "1", name: "Chair" },
    details: "Soft leather armchair"
  },
  {
    id: "6",
    name: "Vintage Chair",
    image: "http://localhost:4000/images/products/product6.jpg",
    price: 65.00,
    category: { id: "1", name: "Furniture" },
    details: "Soft leather armchair"
  },
];


// Define the Category type
const CategoryType  = new GraphQLObjectType({
  name: 'Categories',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  }),
});

// Define the Products type
const ProductsType = new GraphQLObjectType({
  name: 'Products',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    price: { type: GraphQLFloat },
    category: { type: CategoryType },
    details: { type: GraphQLString }
  }),
});

// Define the CartItem type
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
    id: { type: GraphQLString },
    items: { type: new GraphQLList(CartItemType) },
    total: { type: GraphQLFloat }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    products: {
      type: ProductsType,
      args: { id: { type: GraphQLString }},
      resolve(parent, args) {
        // Function to get data from db
      }
    }
  }
})

// Export RootQuery
export default new GraphQLSchema({
  query: RootQuery
})