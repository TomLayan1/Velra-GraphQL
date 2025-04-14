import mongoose, { Document, Schema} from "mongoose";

export interface Product extends Document {
  name: string;
  product_image: string;
  price: number;
  category: string;
  details: string;
  quantity: number;
}

// Products schema
const ProductsSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  product_image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  }}
);

export const ProductModel = mongoose.model<Product>('Product', ProductsSchema);
