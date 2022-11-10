"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const { Schema, model } = mongoose_1.default;
const productSchema = new Schema({
    name: { type: String, default: null },
    description: { type: String, default: null },
    price: {
        amount: Number,
        is_discount: Boolean,
        discount_percent: Number,
        discount_price: Number,
    },
    currency: {
        name: String,
        id: Number,
    },
    category_id: { type: Number, default: null },
    image_url: { type: String, default: null },
    is_in_stock: { type: Boolean, default: null },
    is_popular: { type: Boolean, default: null },
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
productSchema.post('save', handleErrors).plugin(mongoose_paginate_v2_1.default);
const ProductModel = model('product_model', productSchema);
exports.default = ProductModel;
//# sourceMappingURL=Product.model.js.map