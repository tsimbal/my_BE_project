"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const { Schema, model } = mongoose_1.default;
const categorySchema = new Schema({
    name: { type: String, default: null },
    tags: { type: Array, default: null },
    description: { type: String, default: null },
    category_id: { type: Number, default: null },
    image_url: { type: String, default: null },
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
categorySchema.pre('save', handleErrors).plugin(mongoose_paginate_v2_1.default);
const CategoryModel = model('category_model', categorySchema);
exports.default = CategoryModel;
//# sourceMappingURL=Category.model.js.map