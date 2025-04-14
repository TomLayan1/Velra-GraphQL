import mongoose, { Document, Schema} from "mongoose";
import { ref } from "process";

export interface CartItem extends Document {
  name: string,
  product_image: string,
  price: number,
  category: mongoose.Schema.Types.ObjectId,
  details: string,
  cart_item_quantity: number
}

// CartItem schema
const CartItemSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  product_image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  details: {
    type: String,
    required: true,
  },
  cart_item_quantity: {
    type: Number,
    required: true,
  }
})

export const CartItemModel = mongoose.model<CartItem>('CartItem', CartItemSchema);
