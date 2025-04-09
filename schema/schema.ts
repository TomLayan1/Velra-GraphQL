import { GraphQLSchema } from 'graphql';
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLFloat, GraphQLInt } from 'graphql';
import { products, users } from '../data';
import _ from 'lodash'

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
    cart_item_quantity: { type: GraphQLInt}
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

// Create new users
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    location: { type: GraphQLString },
    cart: { type: CartType },
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
        console.log(typeof(args?.id))
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


const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    registerUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        location: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        const newUser = {
          id: String(users.length + 1),
          name: args?.name,
          email: args?.email,
          location: args?.location,
          password: args?.password,
          cart: {
            id: `cart-${users.length + 1}`,
            items: [],
            total: 0,
          },
        };
        users.push(newUser);
        return newUser;
      },
    },
  },
});


// Export RootQuery
export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});