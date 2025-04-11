import mongoose, { Document, Schema} from "mongoose";

export interface CartItemModel extends Document {
  product: mongoose.Types.ObjectId;
  cart_item_quantity: number;
}

// CartItem schema
const CartItemSchema: Schema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  cart_item_quantity: {
    type: Number,
    required: true,
  }
})