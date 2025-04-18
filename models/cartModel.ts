import mongoose, { Document, Schema } from "mongoose";

export interface Cart extends Document {
  items: mongoose.Types.ObjectId[];
  total: number;
}

const CartSchema: Schema = new Schema({
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CartItem'
    }
  ],
  total: {
    type: Number,
    required: true,
    default: 0
  }
})

export const CartModel = mongoose.model<Cart>('Cart', CartSchema);
