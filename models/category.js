import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: { type: String, default: null },
    tags: { type: Array, default: null },
    description: { type: String, default: null },
    category_id: { type: Number, default: null },
    image_url: { type: String, default: null },
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

categorySchema.post('save', handleErrors).plugin(mongoosePaginate);

const Category = model('category', categorySchema);

export default Category;
