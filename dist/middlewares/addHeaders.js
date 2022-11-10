"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addedHeaders = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Cookie');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
};
exports.default = addedHeaders;
//# sourceMappingURL=addHeaders.js.map