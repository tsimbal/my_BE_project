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
const Category_model_js_1 = __importDefault(require("../../models/Category.model.js"));
const faker_1 = require("@faker-js/faker");
const error_service_js_1 = __importDefault(require("../../service/error-service.js"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = {
        name: faker_1.faker.commerce.department(),
        description: faker_1.faker.commerce.productName(),
        image_url: faker_1.faker.image.business(),
    };
    const result = yield Category_model_js_1.default.create(newCategory);
    if (!result) {
        return error_service_js_1.default.badRequest(res, 'Category not created');
    }
    return res
        .status(201)
        .json({ statusCode: 201, data: result, message: 'Category created' });
});
exports.default = createCategory;
//# sourceMappingURL=create.js.map