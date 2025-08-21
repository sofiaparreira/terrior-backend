"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const db_1 = __importDefault(require("./config/db")); // para TS
const logger_1 = __importDefault(require("./config/logger"));
const morganMiddleware_1 = __importDefault(require("./middleware/morganMiddleware"));
const wineRouter_1 = __importDefault(require("./routes/wineRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const orderRouter_1 = __importDefault(require("./routes/orderRouter"));
const cartRouter_1 = __importDefault(require("./routes/cartRouter"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3001'
}));
app.use(express_1.default.json());
const port = config_1.default.get("port");
app.use(morganMiddleware_1.default);
app.use('/api/', wineRouter_1.default);
app.use('/api/auth/', userRouter_1.default);
app.use('/api/', orderRouter_1.default);
app.use('/api/', cartRouter_1.default);
app.listen(3000, async () => {
    await (0, db_1.default)();
    logger_1.default.info(`Aplicação rodando na porta ${port}`);
});
