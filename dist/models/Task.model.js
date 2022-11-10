"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    owner: { type: mongoose_1.Types.ObjectId, ref: 'User' },
    title: { type: String, default: null, required: true },
    description: { type: String, default: null },
    status: { type: String, default: 'created' },
    completedDate: { type: Date, default: new Date() },
}, { versionKey: false, timestamps: true });
// const handleErrors = (error: IError, data: Document, next: NextFunction) => {
//   const { name, code } = error;
//   if (name === 'MongoServerError' && code === 11000) {
//     error.status = 409;
//   } else {
//     error.status = 400;
//   }
//   next();
// };
// taskSchema.post('save', handleErrors).plugin(mongoosePaginate);
const TaskModel = (0, mongoose_1.model)('task_model', taskSchema);
exports.default = TaskModel;
//# sourceMappingURL=Task.model.js.map