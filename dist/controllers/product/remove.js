"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_model_js_1 = __importDefault(require("../../models/Product.model.js"));
const error_service_js_1 = __importDefault(require("../../service/error-service.js"));
const removeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield Product_model_js_1.default.remove({ _id: id });
    if (!product) {
        return error_service_js_1.default.badRequest(res, 'Product not removed');
    }
    return res
        .status(200)
        .json({ statusCode: 200, message: 'Product was removed' });
});
exports.default = removeProduct;
//# sourceMappingURL=remove.js.map