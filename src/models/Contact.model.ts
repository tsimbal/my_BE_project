import { NextFunction } from 'express';
import mongoose, { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IContact } from '../types/contact/IContact';
import { IError } from '../types/server/IErrorResp';

const { Schema, model } = mongoose;

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    phone: { type: String, unique: true, required: true },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

// const handleErrors = (error: IError, data: Document, next: NextFunction) => {
//   const { name, code } = error;
//   if (name === 'MongoServerError' && code === 11000) {
//     error.status = 409;
//   } else {
//     error.status = 400;
//   }
//   next();
// };

// contactSchema.post('save', handleErrors).plugin(mongoosePaginate);

const ContactModel = model<IContact>('ContactModel', contactSchema);

export default ContactModel;
