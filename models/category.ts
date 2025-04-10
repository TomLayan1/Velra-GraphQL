import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  id: Number,
  name: String
});

export default mongoose.model('Category', CategorySchema)

// import mongoose, { Schema, Document } from 'mongoose';

// const CategorySchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
// });

// export interface Category extends Document {
//   name: string;
// }

// export const CategoryModel = mongoose.model<Category>('Category', CategorySchema);
