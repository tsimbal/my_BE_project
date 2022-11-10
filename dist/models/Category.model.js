"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const categorySchema = new Schema({
    name: { type: String, default: null },
    tags: { type: Array, default: null },
    description: { type: String, default: null },
    category_id: { type: Number, default: null },
    image_url: { type: String, default: null },
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
// categorySchema.pre('save', handleErrors).plugin(mongoosePaginate);
const CategoryModel = model('category_model', categorySchema);
exports.default = CategoryModel;
//# sourceMappingURL=Category.model.js.map