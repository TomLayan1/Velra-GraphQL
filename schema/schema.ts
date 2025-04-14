import { GraphQLSchema } from 'graphql';
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLFloat, GraphQLInt } from 'graphql';
import { products, users } from '../data';
import _ from 'lodash'
import { CartModel } from '../models/cartModel';
import { CartItemModel } from '../models/cartItemModel';
import { CategoryModel } from '../models/categoryModel';
import { OrderModel } from '../models/orderModel';
import { ProductModel } from '../models/productsModel';
import { UserModel } from '../models/usersModel';
// import { profile } from 'console';

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

const ProductType = new GraphQLObjectType({
  name: 'Products',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    product_image: { type: GraphQLString },
    price: { type: GraphQLFloat },
    category: { type: GraphQLString },
    details: { type: GraphQLString },
    quantity: { type: GraphQLInt}
  }),
});

const CartItemType = new GraphQLObjectType({
  name: 'CartItems',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    product_image: { type: GraphQLString },
    price: { type: GraphQLFloat },
    category: { type: GraphQLString },
    details: { type: GraphQLString },
    cart_item_quantity: { type: GraphQLInt }
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


// Order type
const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id: { type: GraphQLID },
    user: { type: UserType },
    items: { type: new GraphQLList(CartItemType) },
    total: { type: GraphQLFloat },
  }),
});

// User type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    user_id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    profile_pic: { type: GraphQLString }, 
    location: { type: GraphQLString },
    cart: { type: CartType },
  }),
});


// Root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      resolve() {
        return products
      }
    },
    product: {
      type: ProductType,
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
      type: new GraphQLList(ProductType),
      args: { categoryId: { type: GraphQLID }},
      resolve(parent, args) {
        return products?.filter(p => p.category?.id === args?.id)
      }
    },
    order: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        return OrderModel?.find();
      }
    }
  }
});


const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Mutation for creating new user
    registerUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        location: { type: GraphQLString },
        password: { type: GraphQLString },
        profile_pic: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        let newUser = new UserModel({
          user_id: String(users.length + 1),
          name: args?.name,
          email: args?.email,
          location: args?.location,
          password: args?.password,
          profile_pic: args?.profile_pic,
          cart: {
            id: `cart-${users.length + 1}`,
            items: [],
            total: 0,
          },
        });
        return await newUser.save()
      },
    },

    // Mutation for uploading new category
    addCategory: {
      type: CategoryType,
      args: {
        name: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        const newCategory = new CategoryModel({
          id: String(categories?.length + 1),
          name: args?.name
        });
        return await newCategory.save();
      }
    },

    // Mutation for uploading new products
    uploadProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString },
        product_image: { type: GraphQLString },
        price: { type: GraphQLFloat },
        category: { type: GraphQLString },
        details: { type: GraphQLString },
        quantity: { type: GraphQLInt },
      },
      resolve: async(parent, args) => {
        const newProduct = new ProductModel ({
          id: String(products.length + 1),
          name: args?.name,
          product_image: args?.product_image,
          price: args?.price,
          category: args?.category,
          details: args?.details,
          quantity: args?.quantity
        });
        return await newProduct.save();
      }
    },

    // Mutation for orders
    addOrder: {
      type: OrderType,
      args: {
        user_id: { type: GraphQLID },
        items: { type: new GraphQLList(GraphQLID) },
        total: { type: GraphQLFloat },
      },
      resolve: async(parent, args) => {
        // Fetch user by ID
        const user = await UserModel.findById(args?.user_id);
        if (!user) {
          throw new Error('User not found');
        }
        
        // fetch full cart items if using item IDs
        const cartItems = await CartItemModel.find({ _id: { $in: args.items } });

        // Create order
        const newOrder = new OrderModel({
          user: user._id,
          items: cartItems,
          total: args.total,
          createdAt: new Date().toISOString(),
        });

        return await newOrder.save();
      }
    }
  },
});


// Export RootQuery
export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});