import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
  password: String,
  profilePic: String,
  cart: {
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        cart_item_quantity: Number,
      },
    ],
    total: Number,
  },
});

export default mongoose.model('User', UserSchema);
