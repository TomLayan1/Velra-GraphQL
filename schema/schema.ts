import { GraphQLNonNull, GraphQLSchema } from 'graphql';
import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLFloat, GraphQLInt } from 'graphql';
import { products, users } from '../data';
import _ from 'lodash'
import { CartModel } from '../models/cartModel';
import { CartItemModel } from '../models/cartItemModel';
import { CategoryModel } from '../models/categoryModel';
import { OrderModel } from '../models/orderModel';
import { ProductModel } from '../models/productsModel';
import { UserModel } from '../models/usersModel';
import { UploadModel } from '../models/uploadModel';
import upload from '../middleware/uploads';
import mongoose from 'mongoose';

// Extracted categories from products
let categories = _.uniqBy(products.map(p => p.category), 'id');

// GraphQL types
const CategoryType  = new GraphQLObjectType({
  name: 'Category',
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
  name: 'CartItem',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    product_image: { type: GraphQLString },
    price: { type: GraphQLFloat },
    category: { type: GraphQLString },
    details: { type: GraphQLString },
    item_quantity: { type: GraphQLInt }
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
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    profile_pic: { type: GraphQLString },
    location: { type: GraphQLString },
    cart: { type: CartType },
  })
});

const UploadType = new GraphQLObjectType({
  name: 'Upload',
  fields: () => ({
    id: { type: GraphQLID },
    filename: { type: GraphQLString },
    path: { type: GraphQLString },
    type: { type: GraphQLString }
  })
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
      resolve: async (parent, args) => {
        return await ProductModel.findById(args.id);
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
    searchProductsByCategory: {
      type: new GraphQLList(ProductType),
      args: { category: { type: GraphQLString } },
      resolve: async (parent, args) => {
        return await ProductModel.find({ category: args.category });
      }
    },
    searchProductsByName: {
      type: new GraphQLList(ProductType),
      args: { name: { type: GraphQLString } },
      resolve: async (parent, args) => {
        return await ProductModel.find({
          name: { $regex: args.name, $options: 'i' } // Case-insensitive search
        });
      }
    },
    order: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        return OrderModel?.find();
      }
    },
    uploads: {
      type: new GraphQLList(UploadType),
      resolve: () => UploadModel?.find()
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        profile_pic: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        let profilePath = '';
        if (args?.profile_pic) {
          profilePath = `/uploads/users/${args?.profile_pic}`;
          const newUpload = new UploadModel({
            filename: args.profile_pic,
            path: profilePath,
            type: 'image/png'
          });
          await newUpload.save();
        }

        // Create cart first and save to DB
        const newCart = new CartModel({
          items: [] as any[],
          total: 0
        });
        const savedCart = await newCart.save();

        let newUser = new UserModel({
          name: args?.name,
          email: args?.email,
          location: args?.location,
          password: args?.password,
          profile_pic: profilePath || "",
          cart: savedCart?._id,
        });
        return await newUser.save()
      },
    },

    // Mutation for uploading new category
    addCategory: {
      type: CategoryType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args) => {
        const newCategory = new CategoryModel({
          name: args?.name
        });
        return await newCategory.save();
      }
    },

    // Mutation for uploading new products
    uploadProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        product_image: { type: GraphQLString },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        details: { type: new GraphQLNonNull(GraphQLString) },
        quantity: { type: GraphQLInt },
      },
      resolve: async(parent, args) => {
        let profilePath = '';
        if (args?.product_image) {
          profilePath = `/uploads/products/${args?.product_image}`;
          const newUpload = new UploadModel({
            filename: args.profile_pic,
            path: profilePath || null,
            type: 'image/png'
          });
          await newUpload.save();
        }

        const newProduct = new ProductModel ({
          id: String(products.length + 1),
          name: args?.name,
          product_image: profilePath,
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
        user_id: { type: new GraphQLNonNull(GraphQLID) },
        items: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) },
        total: { type: new GraphQLNonNull(GraphQLFloat) },
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
          user_id: args?.id,
          items: cartItems,
          total: args.total,
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