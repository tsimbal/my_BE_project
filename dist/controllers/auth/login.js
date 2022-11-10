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
const User_model_1 = __importDefault(require("../../models/User.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const token_service_1 = __importDefault(require("../../service/token-service"));
const user_dto_1 = __importDefault(require("../../dto/user-dto"));
const error_service_1 = __importDefault(require("../../service/error-service"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return error_service_1.default.badRequest(res, 'Incorrect data', errors.array());
    }
    const { email, password } = req.body;
    const user = yield User_model_1.default.findOne({ email });
    if (!user) {
        return error_service_1.default.badRequest(res, 'User not found');
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        return error_service_1.default.badRequest(res, 'incorrect password');
    }
    const userData = user_dto_1.default.generateUserDto(user);
    const tokens = token_service_1.default.generateToken(Object.assign({}, userData));
    yield token_service_1.default.saveToken(userData.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    return res.status(200).json(Object.assign(Object.assign({ statusCode: 200 }, tokens), { data: {
            userData,
        } }));
});
exports.default = login;
//# sourceMappingURL=login.js.map