import mongoose, { Document, Schema} from "mongoose";

export interface Category extends Document{
  name: string; 
}

const CategorySchema: Schema = new Schema({
  name: {
    type: String,
    reruired: true
  }
})

export const CategoryModel = mongoose.model<Category>('Category', CategorySchema);
