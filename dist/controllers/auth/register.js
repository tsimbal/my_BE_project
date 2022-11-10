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
const uuid_1 = require("uuid");
const mail_service_1 = __importDefault(require("../../service/mail-service"));
const token_service_1 = __importDefault(require("../../service/token-service"));
const user_dto_1 = __importDefault(require("../../dto/user-dto"));
const error_service_1 = __importDefault(require("../../service/error-service"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return error_service_1.default.badRequest(res, 'Incorrect data', errors.array());
    }
    const { email, password } = req.body;
    const candidate = yield User_model_1.default.findOne({ email });
    if (candidate) {
        return error_service_1.default.badRequest(res, 'User is exist');
    }
    const activationLink = (0, uuid_1.v4)();
    const hashPassword = yield bcryptjs_1.default.hash(password, 3);
    const user = yield User_model_1.default.create({
        email,
        password: hashPassword,
        activationLink,
    });
    yield mail_service_1.default.sendActivationMail(email, `${process.env.API_URL}/api/auth/activation/${activationLink}`);
    const userData = user_dto_1.default.generateUserDto(user);
    const tokens = token_service_1.default.generateToken(Object.assign({}, userData));
    yield token_service_1.default.saveToken(userData.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    return res.status(201).json({
        statusCode: 201,
        message: 'User created',
        data: Object.assign({ userData }, tokens),
    });
});
exports.default = register;
//# sourceMappingURL=register.js.map