"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../helpers/index");
const { isValidObjectId } = mongoose_1.default;
const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return next((0, index_1.createError)(400, `${id} is not valid id format`));
    }
    next();
};
exports.default = isValidId;
//# sourceMappingURL=isValidId.js.map