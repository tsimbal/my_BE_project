import { IUser } from './../types/user/IUserDto';
import { NextFunction } from 'express';
import mongoose, { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IError } from '../types/server/IErrorResp';

const { Schema, model } = mongoose;

const userSchema = new Schema<IUser>(
  {
    name: { type: String, default: null },
    surname: { type: String, default: null },
    sex: { type: Number, default: null },
    birthday: { type: String, default: null },
    city: { type: String, default: null },
    zip: { type: String, default: null },
    country: { type: String, default: null },
    address: { type: String, default: null },
    avatar: { type: String, default: null },
    phone: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
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

// userSchema.post('save', handleErrors).plugin(mongoosePaginate);

const UserModel = model<IUser>('user_model', userSchema);

export default UserModel;
