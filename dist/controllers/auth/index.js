"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.activate = exports.refresh = exports.register = exports.login = void 0;
var login_1 = require("./login");
Object.defineProperty(exports, "login", { enumerable: true, get: function () { return __importDefault(login_1).default; } });
var register_1 = require("./register");
Object.defineProperty(exports, "register", { enumerable: true, get: function () { return __importDefault(register_1).default; } });
var refresh_1 = require("./refresh");
Object.defineProperty(exports, "refresh", { enumerable: true, get: function () { return __importDefault(refresh_1).default; } });
var activation_1 = require("./activation");
Object.defineProperty(exports, "activate", { enumerable: true, get: function () { return __importDefault(activation_1).default; } });
var logout_1 = require("./logout");
Object.defineProperty(exports, "logout", { enumerable: true, get: function () { return __importDefault(logout_1).default; } });
//# sourceMappingURL=index.js.map