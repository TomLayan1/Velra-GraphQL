import mongoose, { Schema, Document } from 'mongoose';

export interface Order extends Document {
  user_id: mongoose.Types.ObjectId;
  items: mongoose.Types.ObjectId[];
  total: number;
  createdAt: Date;
}

const OrderSchema = new Schema({
  user_id: {
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
  }
});


export const OrderModel = mongoose.model<Order>('Order', OrderSchema);
