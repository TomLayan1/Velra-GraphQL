import { buildSchema } from 'graphql';
import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLFloat, GraphQLInt, GraphQLID } from 'graphql';


// Define the Category type
const CategoryType  = new GraphQLObjectType({
  name: 'Categories',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  }),
});

// Define the Products type
const ProductsType = new GraphQLObjectType({
  name: 'Products',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    price: { type: GraphQLFloat },
    category: { type: CategoryType },
    details: { type: GraphQLString }
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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {

  }
})