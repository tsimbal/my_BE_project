import { NextFunction } from 'express';
import mongoose, { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { ICategory } from '../types/category/ICategory';
import { IError } from '../types/errors/IErrorResp';

const { Schema, model } = mongoose;

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, default: null },
    tags: { type: Array, default: null },
    description: { type: String, default: null },
    category_id: { type: Number, default: null },
    image_url: { type: String, default: null },
  },
  { versionKey: false, timestamps: true }
);

const handleErrors = (error: IError, data: Document, next: NextFunction) => {
  const { name, code } = error;
  if (name === 'MongoServerError' && code === 11000) {
    error.status = 409;
  } else {
    error.status = 400;
  }
  next();
};

categorySchema.pre('save', handleErrors).plugin(mongoosePaginate);

const CategoryModel = model<ICategory>('category_model', categorySchema);

export default CategoryModel;
