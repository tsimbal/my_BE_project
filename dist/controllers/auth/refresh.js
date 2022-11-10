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
const user_dto_1 = __importDefault(require("../../dto/user-dto"));
const Token_model_1 = __importDefault(require("../../models/Token.model"));
const User_model_1 = __importDefault(require("../../models/User.model"));
const error_service_1 = __importDefault(require("../../service/error-service"));
const token_service_1 = __importDefault(require("../../service/token-service"));
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refresh_token } = req.cookies;
    if (!refresh_token) {
        return error_service_1.default.unauthorized(res);
    }
    const userData = token_service_1.default.validateRefreshToken(refresh_token);
    const tokenFromDb = yield Token_model_1.default.findOne({ refresh_token });
    if (!userData || !tokenFromDb) {
        return error_service_1.default.unauthorized(res);
    }
    const user = yield User_model_1.default.findById(userData.id);
    const userFromDto = user_dto_1.default.generateUserDto(user);
    const tokens = token_service_1.default.generateToken(Object.assign({}, userFromDto));
    yield token_service_1.default.saveToken(userFromDto.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        sameSite: 'none',
        secure: true,
    });
    return res.status(200).json(Object.assign(Object.assign({ statusCode: 200 }, tokens), { data: Object.assign({}, userFromDto) }));
});
exports.default = refresh;
//# sourceMappingURL=refresh.js.map