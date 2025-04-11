import mongoose, { Schema, Document } from 'mongoose';

export interface Order extends Document {
  user: mongoose.Types.ObjectId;
  items: mongoose.Types.ObjectId[];
  total: number;
  createdAt: Date;
}

const OrderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CartItem',
  }],
  total: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});


export const OrderModel = mongoose.model<Order>('Order', OrderSchema);
