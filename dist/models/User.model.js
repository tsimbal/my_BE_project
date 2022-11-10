"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const { Schema, model } = mongoose_1.default;
const userSchema = new Schema({
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
}, { versionKey: false, timestamps: true });
const handleErrors = (error, data, next) => {
    const { name, code } = error;
    if (name === 'MongoServerError' && code === 11000) {
        error.status = 409;
    }
    else {
        error.status = 400;
    }
    next();
};
userSchema.post('save', handleErrors).plugin(mongoose_paginate_v2_1.default);
const UserModel = model('user_model', userSchema);
exports.default = UserModel;
//# sourceMappingURL=User.model.js.map