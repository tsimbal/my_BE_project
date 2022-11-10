"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_js_1 = require("../../helpers/index.js");
const ctrl = __importStar(require("../../controllers/product/index.js"));
const middleware = __importStar(require("../../middlewares/index.js"));
const router = (0, express_1.Router)();
router.get('/all-products', (0, index_js_1.ctrlWrapper)(ctrl.getAllProducts));
router.get('/:id', (0, index_js_1.ctrlWrapper)(ctrl.getProduct));
router.post('/create', middleware.auth, (0, index_js_1.ctrlWrapper)(ctrl.createProduct));
router.patch('/edit/:id', middleware.auth, (0, index_js_1.ctrlWrapper)(ctrl.editProduct));
router.delete('/delete/:id', middleware.auth, (0, index_js_1.ctrlWrapper)(ctrl.removeProduct));
exports.default = router;
//# sourceMappingURL=product.js.map