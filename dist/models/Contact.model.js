"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    phone: { type: String, unique: true, required: true },
    favorite: { type: Boolean, default: false },
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
// contactSchema.post('save', handleErrors).plugin(mongoosePaginate);
const ContactModel = model('ContactModel', contactSchema);
exports.default = ContactModel;
//# sourceMappingURL=Contact.model.js.map