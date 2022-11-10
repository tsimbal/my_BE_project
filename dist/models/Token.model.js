"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const tokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    refresh_token: { type: String, required: true },
}, { versionKey: false, timestamps: true });
const TokenModel = model('token_model', tokenSchema);
exports.default = TokenModel;
//# sourceMappingURL=Token.model.js.map