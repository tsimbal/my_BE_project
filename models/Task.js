import { Schema, model, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const taskSchema = new Schema(
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

taskSchema.post('save', handleErrors).plugin(mongoosePaginate);

const TaskModel = model('task_model', taskSchema);

export default TaskModel;
