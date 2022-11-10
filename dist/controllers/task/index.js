"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTask = exports.editTask = exports.getTask = exports.getAllTasks = exports.createTask = void 0;
var create_1 = require("./create");
Object.defineProperty(exports, "createTask", { enumerable: true, get: function () { return __importDefault(create_1).default; } });
var getAll_1 = require("./getAll");
Object.defineProperty(exports, "getAllTasks", { enumerable: true, get: function () { return __importDefault(getAll_1).default; } });
var getInfo_1 = require("./getInfo");
Object.defineProperty(exports, "getTask", { enumerable: true, get: function () { return __importDefault(getInfo_1).default; } });
var edit_1 = require("./edit");
Object.defineProperty(exports, "editTask", { enumerable: true, get: function () { return __importDefault(edit_1).default; } });
var remove_1 = require("./remove");
Object.defineProperty(exports, "removeTask", { enumerable: true, get: function () { return __importDefault(remove_1).default; } });
//# sourceMappingURL=index.js.map