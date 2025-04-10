import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  details: String,
  quantity: Number,
});

export default mongoose.model('Product', ProductSchema);
