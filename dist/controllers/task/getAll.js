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
const Task_model_1 = __importDefault(require("../../models/Task.model"));
const error_service_1 = __importDefault(require("../../service/error-service"));
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield Task_model_1.default.find();
    if (!tasks.length) {
        return error_service_1.default.badRequest(res, 'Tasks not found');
    }
    return res.status(200).json({ statusCode: 200, data: tasks });
});
exports.default = getAllTasks;
//# sourceMappingURL=getAll.js.map