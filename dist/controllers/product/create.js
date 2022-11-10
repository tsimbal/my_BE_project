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
const Product_model_1 = __importDefault(require("../../models/Product.model"));
const error_service_1 = __importDefault(require("../../service/error-service"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = req.body;
    const result = yield Product_model_1.default.create(newProduct);
    if (!result) {
        return error_service_1.default.badRequest(res, 'Product not created');
    }
    return res
        .status(201)
        .json({ statusCode: 201, data: result, message: 'Product created' });
});
exports.default = createProduct;
//# sourceMappingURL=create.js.map