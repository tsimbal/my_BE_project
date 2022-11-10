"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validators = {
    register: [
        (0, express_validator_1.check)('email', 'Incorrect email').isEmail(),
        (0, express_validator_1.check)('password', 'min length 6').isLength({ min: 6 }),
    ],
    login: [
        (0, express_validator_1.check)('email', 'Incorrect email').isEmail(),
        (0, express_validator_1.check)('password', 'Enter password').exists(),
    ],
};
exports.default = validators;
//# sourceMappingURL=validators.js.map