const { Schema, model, Types } = require('mongoose');
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema(
  {
    owner: { type: Types.ObjectId, ref: 'User' },
    title: { type: String, default: null, required: true },
    description: { type: String, default: null },
    status: { type: String, default: 'created' },
    completedDate: { type: Date, default: new Date() },
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

userSchema.post('save', handleErrors).plugin(mongoosePaginate);

const User = model('user', userSchema);

export default User;