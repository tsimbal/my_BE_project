import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, model } = mongoose;

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    favorite: {
      type: Boolean,
      enum: [true, false],
      default: false,
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

contactsSchema.post('save', handleErrors).plugin(mongoosePaginate);

const Contact = model('contact', contactsSchema);

export default Contact;
