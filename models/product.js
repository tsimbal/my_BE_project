import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, default: null },
    description: { type: String, default: null },
    price: {
      amount: Number,
      is_discount: Boolean,
      discount_percent: Number,
      discount_price: Number,
    },
    currency: {
      name: String,
      id: Number,
    },
    category_id: { type: Number, default: null },
    image_url: { type: String, default: null },
    is_in_stock: {
      type: Boolean,
      default: null,
    },
    is_popular: {
      type: Boolean,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const handleErrors = (error, data, next) => {
  const { name, code } = error;
  if (name === 'MongoServerError' && code === 11000) {
    error.status = 409;
  } else {
    error.status = 400;
  }
  next();
};

productSchema.post('save', handleErrors).plugin(mongoosePaginate);

const Product = model('product', productSchema);

export default Product;