"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// const swaggerDoc = JSON.parse(
//   `${readFile(new URL('./swagger/openapion', import.meta.url))}`
// );
const doc = require('./swagger/openapi.json');
const middleware = __importStar(require("./middlewares/index"));
const contact_1 = __importDefault(require("./routes/api/contact"));
const auth_1 = __importDefault(require("./routes/api/auth"));
const user_1 = __importDefault(require("./routes/api/user"));
const product_1 = __importDefault(require("./routes/api/product"));
const category_1 = __importDefault(require("./routes/api/category"));
const currency_1 = __importDefault(require("./routes/api/currency"));
const { PORT = 5000 } = process.env;
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: [`${process.env.CLIENT_URL}`], credentials: true }));
app.use((0, compression_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, compression_1.default)({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
        if (req.headers['x-no-compression'])
            return false;
        return compression_1.default.filter(req, res);
    },
}));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(doc));
app.use('/api/contacts', middleware.addedHeaders, contact_1.default);
app.use('/api/auth', middleware.addedHeaders, auth_1.default);
app.use('/api/user', middleware.addedHeaders, middleware.auth, user_1.default);
app.use('/api/products', middleware.addedHeaders, product_1.default);
app.use('/api/category', middleware.addedHeaders, category_1.default);
app.use('/api/currency', middleware.addedHeaders, currency_1.default);
app.use((req, res) => {
    res.status(404).json({
        message: 'Not found',
    });
});
app.use((error, req, res, _) => {
    const { status = 500, message = 'Server error' } = error;
    res.status(status).json({
        message,
    });
});
function start() {
    try {
        mongoose_1.default.connect('mongodb+srv://tsimbal:Qwerty654321@cluster0.abyp07w.mongodb.net/test_node_db?retryWrites=true&w=majority');
        app.listen(PORT, () => console.log(`Server has been started on PORT: ${PORT}`));
    }
    catch (error) {
        const typedError = error;
        console.log('Server error!!!', typedError.message);
        process.exit(1);
    }
}
start();
//# sourceMappingURL=index.js.map