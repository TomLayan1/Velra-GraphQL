import mongoose, { Document, Schema} from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  location: string;
  password: string;
  profile_pic: string;
  cart: {
    items: {
        product: mongoose.Schema.Types.ObjectId;
        cart_item_quantity: number;
      }[];
    total: number;
  };
}

// User schema
const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
  },
  location: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  profile_pic: {
    type: String,
    required: false
  },
  cart: {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product'
        },
        cart_items_quantity: {
          type: Number,
          required: true,
          min: 0
        }
      }
    ],
    total: {
      type: Number,
      required: true,
      min: 0
    }
  }}
)

export const UserModel = mongoose.model<User>('User', UserSchema);
