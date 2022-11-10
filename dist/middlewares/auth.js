"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_service_1 = __importDefault(require("../service/error-service"));
const token_service_1 = __importDefault(require("../service/token-service"));
const auth = (req, res, next) => {
    if (req.meta === 'OPTIONS')
        return next();
    try {
        const authorization = req.headers.authorization;
        if (!authorization)
            return error_service_1.default.unauthorized(res);
        const accessToken = authorization.split(' ')[1];
        if (!accessToken)
            return error_service_1.default.unauthorized(res);
        const userData = token_service_1.default.validateAccessToken(accessToken);
        if (!userData)
            return error_service_1.default.unauthorized(res);
        req.user = userData;
        next();
    }
    catch (err) {
        return error_service_1.default.unauthorized(res);
    }
};
exports.default = auth;
//# sourceMappingURL=auth.js.map