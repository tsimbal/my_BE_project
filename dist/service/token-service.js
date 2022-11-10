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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Token_model_1 = __importDefault(require("../models/Token.model"));
exports.default = {
    jwtSecret: process.env.JWT_SECRET,
    refreshJwtSecret: process.env.REFRESH_JWT_SECRET,
    generateToken(data) {
        const access_token = jsonwebtoken_1.default.sign(data, this.jwtSecret, {
            expiresIn: '15s',
        });
        const refresh_token = jsonwebtoken_1.default.sign(data, this.refreshJwtSecret, {
            expiresIn: '30d',
        });
        return {
            access_token,
            refresh_token,
        };
    },
    saveToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield Token_model_1.default.findOne({ user: userId });
            if (tokenData) {
                tokenData.refresh_token = refreshToken;
                return yield tokenData.save();
            }
            const token = yield Token_model_1.default.create({
                user: userId,
                refresh_token: refreshToken,
            });
            return token;
        });
    },
    validateAccessToken(token) {
        try {
            const userData = jsonwebtoken_1.default.verify(token, this.jwtSecret);
            return userData;
        }
        catch (e) {
            return null;
        }
    },
    validateRefreshToken(token) {
        try {
            const userData = jsonwebtoken_1.default.verify(token, this.refreshJwtSecret);
            return userData;
        }
        catch (e) {
            return null;
        }
    },
};
//# sourceMappingURL=token-service.js.map