"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProduct = exports.editProduct = exports.getProduct = exports.getAllProducts = exports.createProduct = void 0;
var create_1 = require("./create");
Object.defineProperty(exports, "createProduct", { enumerable: true, get: function () { return __importDefault(create_1).default; } });
var getAll_1 = require("./getAll");
Object.defineProperty(exports, "getAllProducts", { enumerable: true, get: function () { return __importDefault(getAll_1).default; } });
var getInfo_1 = require("./getInfo");
Object.defineProperty(exports, "getProduct", { enumerable: true, get: function () { return __importDefault(getInfo_1).default; } });
var edit_1 = require("./edit");
Object.defineProperty(exports, "editProduct", { enumerable: true, get: function () { return __importDefault(edit_1).default; } });
var remove_1 = require("./remove");
Object.defineProperty(exports, "removeProduct", { enumerable: true, get: function () { return __importDefault(remove_1).default; } });
//# sourceMappingURL=index.js.map